const { createApp } = Vue;
const DateTime = luxon.DateTime;

createApp({
    data() {
        return {
            newMessage: '',
            filter: '',
            currentActiveIndex: 0,
            currentMessageIndex: -1,
            currentInfoIndex: -1,
            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './img/avatar_2.png',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './img/avatar_3.png',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './img/avatar_6.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './img/avatar_8.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
        }
    },
    methods: {
        changeChat(index) {
            this.currentActiveIndex = index;
        },
        getTime(date) {
            if(date === '')
                return date;
            const time = DateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss");
            return `${time.hour.toString().padStart(2, 0)}:${time.minute.toString().padStart(2, 0)}`
        },
        getActualDate() {
            const date = DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss");
            return date;
        },
        scrollView() {
            const chatWindow = document.getElementById("chat-window");
            chatWindow.scrollTop =chatWindow.scrollHeight;
        },
        enterNewMessage() {
            const message = {
                date: this.getActualDate(),
                message: this.newMessage,
                status: 'sent'
            };

            const receivedMessage = {
                date: this.getActualDate(),
                message: 'Ok',
                status: 'received'
            };

            if (this.newMessage !== '') {

                this.contacts[this.currentActiveIndex].messages.push(message);
                this.scrollView();
                setTimeout(() => {
                    this.contacts[this.currentActiveIndex].messages.push(receivedMessage);
                    this.scrollView();
                }, 1000);

                this.newMessage = '';
            }

        },
        toggleMenu(index = -1) {
            if(this.currentMessageIndex === index || index === -1){
                this.currentMessageIndex = -1;
            }
            else{
                this.currentMessageIndex = index;
            }
        },
        deleteMessage(index) {
            this.contacts[this.currentActiveIndex].messages.splice(index, 1);      
        },
        getLastMessageDate(index){
            const contact = this.contacts[index];

            if(contact.messages.length !== 0){
                return contact.messages[contact.messages.length -1].date; 
            }
            
            return '';
        },
        getLastMessageText(index) {
            const contact = this.contacts[index];

            if(contact.messages.length !== 0){
                return contact.messages[contact.messages.length -1].message; 
            }
            
            return '';
        },
        toggleInfo(index = -1) {
            if(this.currentInfoIndex === index || index === -1){
                this.currentInfoIndex = -1;
            }
            else{
                this.currentInfoIndex = index;
            }
        },
    }
}).mount('#app');
