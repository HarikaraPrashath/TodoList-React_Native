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

const NoteScreen = () => {
  // State to manage the list of notes
  const [notes, setNotes] = useState([]);

  // State to manage the modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // State to manage the new note input
  const [newNote, setNewNote] = useState("");

  // Loading function
  const [loading, setLoading] = useState(true);

  // Function for handling errors
  const [error, setError] = useState(null);

  // Function to add a new note
  const addNote = async () => {
    if (newNote.trim() === "") return; // Prevent adding empty notes

    const response = await noteService.addNote(newNote);
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

  // Function to fetch notes from the database
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await noteService.getNotes();

      if (response.error) {
        setError(response.error);
        Alert.alert("Error", response.error);
      } else {
        setNotes(response.response);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#f4511e"} />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {/* Display notes in a list */}
          <Text style={styles.heading}>Notes</Text>
          <FlatList
            data={notes}
            keyExtractor={(item) =>
              item.id || item.$id || Date.now().toString()
            } // Ensure each item has a unique key
            renderItem={({ item }) => (
              <View style={styles.noteItem}>
                <Text style={styles.notesTitle}>{item.text}</Text>
              </View>
            )}
          />
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
              placeholderTextColor={"#666"}
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
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#ff6347",
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
});

export default NoteScreen;
