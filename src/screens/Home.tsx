import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  FlatList
} from 'react-native';
import { SkillCard } from '../components/SkillCard';
import { Button } from '../components/Button';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill

    }

    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveNewSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting("Good morning");
    }
    else if (currentHour >= 12 && currentHour < 18) {
      setGretting("Good afternoon")
    } else {
      setGretting("Good night")
    }

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Welcome, Vitor
      </Text>

      <Text style={styles.gretting}>
        {gretting}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor='#555'
        onChangeText={setNewSkill}
      />

      <Button
        onPress={handleAddNewSkill}
        title="Add"
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveNewSkill(item.id)}
          />
        )}
      />

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70
  },
  title: {
    color: '#FFF',
    paddingHorizontal: 30,
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  gretting: {
    color: '#FFF'
  }
});