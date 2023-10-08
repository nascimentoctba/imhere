import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList , Alert} from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';

export function Home() {
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('')
   
    function handleParticipantAdd() {
        if(participants.includes(participantName)){
           return Alert.alert('Participante Existe', 'Já existe um participante na lista com esse nome!' )
        }

        setParticipants(preState => [...preState, participantName]);
        setParticipantName('');      
    }

    function handleParticipatRemove(name: string) {      
        console.log(name);  
        Alert.alert('Remover', `Remover o Participante ${name}`, [
            {
                text:'Sim',
                onPress: ()=>  setParticipants(prevState => prevState.filter(participant => participant !== name))

            },
            {
                text:'Não',
                style:'cancel'
            }
        ])
    }
 
    return (
        <View style={styles.container}>
            <Text key='1' style={styles.eventName}>
              My Todo React Native
            </Text>
            <Text key='2' style={styles.eventDate}>terça-feira, dia 3 de Outubro de 2023</Text>

            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor='#6b6b6b'
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants} //participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipatRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() =>(
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione informações a sua lista!
                    </Text>
                )}
            />
        </View>
    )
}