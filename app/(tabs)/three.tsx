import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

type complextData = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

// Helper function to generate a large dataset
const generateLargeDataSet = (size: number) => {
  return Array.from({ length: size }, (_, i) => ({
    id: i.toString(),
    title: `Item ${i}`,
    description: `This is a detailed description for item ${i}.`,
    imageUrl: `https://via.placeholder.com/150?text=Item+${i}`,
  }));
};

// Heavy computation function
const performHeavyComputation = (index: number) => {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sin(i) * Math.cos(i);
  }
  return result.toFixed(2);
};

// Complex item component
const ComplexItemComponent = ({ item }: { item: complextData }) => {
  const heavyResult = useMemo(
    () => performHeavyComputation(parseInt(item.id)),
    [item.id]
  );

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.computation}>
          Computation Result: {heavyResult}
        </Text>
      </View>
    </View>
  );
};

// Component to render a large data set with complex items
const LargeDataComponent = () => {
  const largeData = useMemo(() => generateLargeDataSet(10000), []);

  return (
    <FlatList
      data={largeData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ComplexItemComponent item={item} />}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  computation: {
    fontSize: 12,
    color: "#999",
  },
});

export default LargeDataComponent;
