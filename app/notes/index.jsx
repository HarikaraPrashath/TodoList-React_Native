import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useState } from "react";

const NoteScreen = () => {
  // State to manage the list of notes
  const [note, setNotes] = useState([
    { id: 1, title: "Note 1"},
    { id: 2, title: "Note 2"},
    { id: 3, title: "Note 3"},
  ]);

  // State to manage the modal visibility
  const [modelVisible, setModelVisible] = useState(false);
  
  // State to manage the new note input
  const [newNote, setNewNote] = useState("");

  // Function to add a new note to the list
  const addNote = () => {
    if (newNote.trim() === "") return; // Prevent adding empty notes

    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: Date.now().toString(), // Generate a unique ID
        title: newNote, 
      },
    ]);

    setNewNote(""); // Clear input field
    setModelVisible(false); // Close the modal
  };

  return (
    <View style={styles.container}>
      <Text>Notes</Text>

      {/* Display notes in a list */}
      <FlatList
        data={note}
        keyExtractor={(item) => item.id.toString()} // Ensure key is a string
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.notesTittle}>{item.title}</Text>
          </View>
        )}
      />

      {/* Button to open the add note modal */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModelVisible(true)}
      >
        <Text style={styles.add}>+ Add Note</Text>
      </TouchableOpacity>

      {/* Modal for adding new notes */}
      <Modal
        visible={modelVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModelVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTittle}>Add Note</Text>

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
                onPress={() => setModelVisible(false)}
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
    backgroundColor: "#f5f5f5", // Light gray background
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
    elevation: 5, // Adds shadow for Android
  },
  notesTittle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notesDec: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  addButton: {
    backgroundColor: "#ff6347", // Tomato red
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
  modalTittle: {
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
});

export default NoteScreen;
