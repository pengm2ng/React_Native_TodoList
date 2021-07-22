import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import produce from 'immer';

/*
//immer 사용법
const obj =  {a: 1, b: 2 };
const newObj = produce( obj, draft =>{
  draft.b = 'b';
  draft.c = [];
});
*/
/*
  //---불변성---
  //원본을 수정하지 않고 사용
  const array = [];
  array.map
  array.filter

  //원본을 수정함.
  array.push
  array.pop
  array.shift, unshift
*/

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex:1;


`;

const Container = styled.SafeAreaView`
  flex:1;
  padding-top: ${Constants.statusBarHeight}px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  padding: 8px 24px;
  
`;
const TodoItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 8px;

`;
const TodoItemText = styled.Text`
  font-size: 20px;
  flex:1;
`;
const TodoItemButton = styled.Button``;

const Contents = styled.ScrollView`
  flex:1;
  padding: 8px 24px;
`;

const Input = styled.TextInput`
  border: 1px solid #e5e5e5;
  flex: 1;
  
`;
const Btn = styled.Button``;

const TempText = styled.Text`
  font-size: 20px;
  margin-bottom: 12px;

`;

const Check = styled.TouchableOpacity`
  margin-right: 4px;
`;
const CheckIcon = styled.Text`
  font-size: 20px;
`;




export default function App() {
  const [list, setList] = React.useState([

  ]);

  const [inputTodo, setInputTodo] = React.useState('');
  //컴포넌트, 컴포넌트로 이루어진 배열을 리턴할 수 있음.

  //처음 시작할때 저장되있었던 string 목록 가져와서 setList에 넣어주기
  //ES6 - promise 방식
  React.useEffect(() => {
    AsyncStorage.getItem('list')
      .then(data => {
        if (data != null) {
          setList(JSON.parse(data));
        }

      })
      .catch(error => {
        alert(error.message);
      });
  }, []);

  const store = (newList) => {
    setList(newList);
    AsyncStorage.setItem('list', JSON.stringify(newList));
  }




  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <Contents>
          {list.map(item => {
            return (
              <TodoItem key={item.id}>
                <Check onPress ={()=>{
                  store(produce(list, draft=>{
                    const index = list.indexOf(item);
                    draft[index].done=!list[index].done;
                    alert(draft[index].done)
                  }));
                }}>
                  <CheckIcon>
                    {item.done ? '✅' : '☑️'}
                    </CheckIcon>
                </Check>
                <TodoItemText >
               
                  {item.todo}
                </TodoItemText>
                <TodoItemButton title="삭제"
                  onPress={() => {
                    const rejectedList = new _.reject(list, element => element.id === item.id)
                    store(rejectedList);

                  }} />
              </TodoItem>
            )
          })}

        </Contents>
        <InputContainer>
          <Input value={inputTodo} onChangeText={todo => setInputTodo(todo)} />

          <Btn title="전송"
            onPress={() => {
              if (inputTodo === '') {
                return;
              }
              const newItem = {
                id: new Date().getTime().toString(),
                todo: inputTodo,
                done : false,

              };
              store([
                ...list, //전개 연산자 spread operator
                newItem,
              ]);
              setInputTodo('');
            }} />

        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({

});
