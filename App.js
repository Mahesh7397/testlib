import React, { useRef } from "react";
import { SectionList, Text, View, StyleSheet, Button } from "react-native";

const DATA = [
  {
    title: "Fruits",
    data: ["Apple", "Banana", "Orange"]
  },
  {
    title: "Vegetables",
    data: ["Carrot", "Tomato", "Cucumber"]
  },
  {
    title: "Dairy",
    data: ["Milk", "Cheese", "Butter"]
  },
  {
    title: "Fruits",
    data: ["Apple", "Banana", "Orange"]
  },
  {
    title: "Vegetables",
    data: ["Carrot", "Tomato", "Cucumber"]
  },
  {
    title: "Dairy",
    data: ["Milk", "Cheese", "Butter"]
  },
  {
    title: "Fruits",
    data: ["Apple", "Banana", "Orange"]
  },
  {
    title: "Vegetables",
    data: ["Carrot", "Tomato", "Cucumber"]
  },
  {
    title: "Dairy",
    data: ["Milk", "Cheese", "Butter"]
  },
  {
    title: "Fruits",
    data: ["Apple", "Banana", "Orange"]
  },
  {
    title: "Vegetables",
    data: ["Carrot", "Tomato", "Cucumber"]
  },
  {
    title: "Dairy",
    data: ["Milk", "Cheese", "Butter"]
  }
];

const App = () => {
  const sectionListRef = useRef(null);

  // Function to Scroll to a Specific Section
  const scrollToSection = (sectionIndex) => {
    sectionListRef.current.scrollToLocation({
      sectionIndex: sectionIndex, // Section index (0-based)
      itemIndex: 0, // First item in the section
      animated: true,
      viewPosition: 0.5 // Adjusts where the section appears on the screen
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SectionList Scroll Example</Text>

      <View style={styles.buttons}>
        <Button title="Scroll to Fruits" onPress={() => scrollToSection(0)} />
        <Button title="Scroll to Vegetables" onPress={() => scrollToSection(1)} />
        <Button title="Scroll to Dairy" onPress={() => scrollToSection(2)} />
      </View>

      <SectionList
        ref={sectionListRef} // Attach ref to SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#f4f4f4",
    padding: 5,
    marginTop: 10
  },
  item: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  }
});

export default App;
