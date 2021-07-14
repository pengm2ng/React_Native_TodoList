import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import _ from 'lodash';

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





export default function App() {
  const [list, setList] = React.useState([
    
  ]);

  const [inputTodo, setInputTodo] = React.useState(''); 

  //컴포넌트, 컴포넌트로 이루어진 배열을 리턴할 수 있음.
  return (
    <Container> 
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <Contents>
          {list.map(item => {
            return (
              <TodoItem key={item.id}>
                <TodoItemText >
                  {item.todo}
                </TodoItemText>
                <TodoItemButton title="삭제" 
                onPress={() => { 
                  const rejectedList = _.reject(list, element => element.id === item.id)
                  setList(rejectedList);

                }} />
              </TodoItem>
            )
          })}

        </Contents>
        <InputContainer>
          <Input value = { inputTodo } onChangeText ={ value => setInputTodo(value) } />
          <Btn title="전송" 
                    onPress={() => { 
                      if( inputTodo ===''){
                        return;
                      }
                      const newItem = {
                        id: new Date().getTime().toString(),
                        todo: inputTodo,

                      };
                      setList([
                        ...list, //전개 연산자 spread operator
                        newItem,
                      ]);
                      setInputTodo('')
                    }} />

        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
