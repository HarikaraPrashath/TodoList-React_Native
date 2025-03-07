import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import noteService from "../../service/noteService.js";
import Icon from "react-native-vector-icons/MaterialIcons";
import { router, useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext.js";

const NoteScreen = () => {
  const { user, loading: authLoading } = useAuth();

  // State to manage the list of notes (coming from the server)
  const [notes, setNotes] = useState([]);

  // State to manage the modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // State to manage the new note input (send to the server)
  const [newNote, setNewNote] = useState("");

  // Loading function
  const [loading, setLoading] = useState(true);

  // Function for handling errors
  const [error, setError] = useState(null);

  // Function to add a new note
  const addNote = async () => {
    if (newNote.trim() === "") return; // Prevent adding empty notes

    const response = await noteService.addNote(user.$id, newNote);
    console.log("newText", newNote); // coming
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      // Assuming response.response contains the note data you want to add
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: Date.now().toString(), // Generate a unique ID
          title: newNote,
          // Add other properties from response if needed
        },
      ]);
      fetchNotes(); // Fetch updated notes from the server
    }

    setNewNote(""); // Clear input field
    setModalVisible(false); // Close the modal
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth");
    }
  }, [user, authLoading]);

  // Function to fetch notes from the database
  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      console.log(user.$id);
      const response = await noteService.getNotes(user.$id);
      if (response.error) {
        setError(response.error);
        Alert.alert("Error", response.error);
      } else {
        setNotes(response.data);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
    setLoading(false);
  };

  // Function to delete a note
  const onDelete = async (id) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await noteService.deleteNote(id);
          if (response.error) {
            Alert.alert("Error", response.error);
          } else {
            setNotes((prevNotes) =>
              prevNotes.filter((note) => note.$id !== id)
            );
          }
        },
      },
    ]);
  };

  // const handleSave = async () => {
  //   if (editText.trim() === "") return;

  //   const response = await noteService.updateNote(editingNoteId, { text: editText });
  //   if (response.error) {
  //     Alert.alert("Error", response.error);
  //   } else {
  //     setNotes((prevNotes) =>
  //       prevNotes.map((note) =>
  //         note.id === editingNoteId ? { ...note, text: editText } : note
  //       )
  //     );
  //     setIsEditing(false);
  //     setEditText("");
  //     setEditingNoteId(null);
  //   }
  // };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#f4511e" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Display notes in a list */}
          {notes.length === 0 ? (
            <View style={styles.noNotesContainer}>
              <Text style={styles.noNotesText}>No Notes Available</Text>
              <Text style={styles.noNotesSubText}>
                Please add your first note.
              </Text>
            </View>
          ) : (
            <FlatList
              data={notes}
              keyExtractor={(item) =>
                item.id || item.$id || Date.now().toString()
              } // Ensure each item has a unique key
              renderItem={({ item }) => (
                <View style={styles.noteItem}>
                  <Text style={styles.noteTitle}>{item.text}</Text>
                  <TouchableOpacity onPress={() => onDelete(item.$id)}>
                    <Icon name="delete" size={24} color="#ff4d4d" />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </>
      )}

      {/* Button to open the add note modal */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.add}>+ Add Note</Text>
      </TouchableOpacity>

      {/* Modal for adding new notes */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Note</Text>

            {/* Input field for entering new notes */}
            <TextInput
              style={styles.input}
              placeholder="Enter Note ..."
              placeholderTextColor="#666"
              value={newNote}
              onChangeText={setNewNote}
            />

            {/* Buttons to cancel or save the note */}
            <View style={styles.modalButton}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={addNote}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flexShrink: 1, // Prevents overflow
  },
  addButton: {
    backgroundColor: "orange",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "orange",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },
  add: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  cancelText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#f4511e",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  noNotesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  noNotesText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  noNotesSubText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});

export default NoteScreen;
