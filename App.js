import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { React, useState, useEffect } from 'react';
import styled from 'styled-components';


export default function App() {

  const AppTitle = styled.Text`
    font-size: 30px;
    margin-top: 50px;
    font-weight: 500;
    margin-left: 20px;
    margin-bottom: 10px;
  `;
    const ContactContainer = styled.Text`
    height: 50px;
    width: 98%;
    
    margin-left: 5px;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 5px;
    padding-left: 10px;
    margin-bottom: 3px;
    
  `;

  const ContactName = styled.Text`
    font-size:17px;
    padding: 5px;
  `;
    const ContactNumber = styled.Text`
    font-size:15px;
  `;

  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        } else {
          setError('Нет доступных контактов');
        }
      } else {
        setError("Доступ к контактам запрещён");
      }
    })();
  }, []);

  return (
    <View>
      <AppTitle>
        Contacts
      </AppTitle>
      <ScrollView>


        {error ? error : contacts.map((contact) => 
        <ContactContainer>
          <ContactName>
            {contact.name}
          </ContactName>
          <ContactNumber>
          {'\n'}{contact.phoneNumbers[0].number}
          </ContactNumber>
        </ContactContainer>
        )}  


      </ScrollView>
    </View>
  );
}
