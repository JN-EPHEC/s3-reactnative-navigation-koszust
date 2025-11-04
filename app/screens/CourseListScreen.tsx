import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type Course = {
  id: string;
  title: string;
  description: string;
};

type RootStackParamList = {
  CourseList: undefined;
  CourseDetail: { courseId: string; title: string; description: string };
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'CourseList'>;
};

const courses: Course[] = [
  { id: '1', title: 'Intro to React Native', description: 'Learn the basics of React Native.' },
  { id: '2', title: 'Advanced JavaScript', description: 'Deep dive into modern JavaScript concepts.' },
  { id: '3', title: 'UI/UX for Developers', description: 'Design better user interfaces and experiences.' },
];

export default function CourseListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('CourseDetail', {
                courseId: item.id,
                title: item.title,
                description: item.description,
              })
            }
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
});
