import { Component, ChangeDetectionStrategy, signal, computed, ViewChild, AfterViewChecked } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgScrollbar } from 'ngx-scrollbar';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

interface Message {
  text: string;
  time: string;
  sender: 'me' | 'other';
  senderName: string;
}

interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline';
  statusText: string;
  messages: Message[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    NgScrollbar,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class ChatComponent implements AfterViewChecked {
  searchText = signal('');
  newMessage = signal('');
  
  @ViewChild('scrollable', { read: NgScrollbar }) scrollable?: NgScrollbar;

  contacts = signal<Contact[]>([
    {
      id: 1,
      name: 'Dr. William Smith',
      role: 'Cardiologist',
      avatar: 'assets/images/user/user1.jpg',
      status: 'offline',
      statusText: 'left 7 mins ago',
      messages: [
        { text: 'Hi Dr. Robert, did you check the lab results for Room 204?', time: '10:10 AM, Today', sender: 'other', senderName: 'Dr. William Smith' },
        { text: 'Yes, I just reviewed them. The potassium levels are stable now.', time: '10:12 AM, Today', sender: 'me', senderName: 'Dr. Robert' },
        { text: 'Great. Let’s proceed with the scheduled stress test tomorrow.', time: '10:15 AM, Today', sender: 'other', senderName: 'Dr. William Smith' }
      ]
    },
    {
      id: 2,
      name: 'Martha Williams',
      role: 'Patient (Ward B, Bed 12)',
      avatar: 'assets/images/user/user2.jpg',
      status: 'online',
      statusText: 'online',
      messages: [
        { text: 'Hello doctor, when will I be discharged?', time: '09:00 AM, Today', sender: 'other', senderName: 'Martha Williams' },
        { text: 'Hello Martha, your recovery is looking excellent. We are planning for tomorrow morning.', time: '09:05 AM, Today', sender: 'me', senderName: 'Dr. Robert' },
        { text: 'Thank you so much, doctor!', time: '09:06 AM, Today', sender: 'other', senderName: 'Martha Williams' }
      ]
    },
    {
      id: 3,
      name: 'Nurse Joseph Clark',
      role: 'ICU Supervisor',
      avatar: 'assets/images/user/user3.jpg',
      status: 'online',
      statusText: 'online',
      messages: [
        { text: 'Dr. Robert, patient in ICU Bed 4 vitals are spiking slightly.', time: '11:20 AM, Today', sender: 'other', senderName: 'Joseph Clark' },
        { text: 'I am on my way. Keep monitor on BP and prepare 50mg of Metoprolol if BP exceeds 160.', time: '11:22 AM, Today', sender: 'me', senderName: 'Dr. Robert' }
      ]
    },
    {
      id: 4,
      name: 'Dr. Nancy Taylor',
      role: 'Pediatrician',
      avatar: 'assets/images/user/user4.jpg',
      status: 'online',
      statusText: 'online',
      messages: [
        { text: 'Are you attending the pediatric consultation panel at 2 PM?', time: 'Yesterday', sender: 'other', senderName: 'Dr. Nancy Taylor' },
        { text: 'Yes, I will be presenting the case study on pediatric asthma management.', time: 'Yesterday', sender: 'me', senderName: 'Dr. Robert' }
      ]
    },
    {
      id: 5,
      name: 'Margaret Wilson',
      role: 'Head of Pharmacy',
      avatar: 'assets/images/user/user5.jpg',
      status: 'online',
      statusText: 'online',
      messages: [
        { text: 'New batch of Insulin glargine has arrived. Ready for allocation.', time: 'Yesterday', sender: 'other', senderName: 'Margaret Wilson' }
      ]
    },
    {
      id: 6,
      name: 'Jane Brown',
      role: 'Patient (OPD)',
      avatar: 'assets/images/user/user7.jpg',
      status: 'offline',
      statusText: 'left 10 hours ago',
      messages: [
        { text: 'Doctor, my prescription refill was declined at the counter.', time: '2 days ago', sender: 'other', senderName: 'Jane Brown' },
        { text: 'Sorry about that, Jane. I have re-authorized it. You can collect it now.', time: '2 days ago', sender: 'me', senderName: 'Dr. Robert' }
      ]
    }
  ]);

  selectedContactId = signal<number>(1);

  selectedContact = computed(() => {
    return this.contacts().find(c => c.id === this.selectedContactId()) || this.contacts()[0];
  });

  filteredContacts = computed(() => {
    const query = this.searchText().toLowerCase().trim();
    if (!query) return this.contacts();
    return this.contacts().filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.role.toLowerCase().includes(query)
    );
  });

  private needScrollToBottom = false;

  selectContact(id: number) {
    this.selectedContactId.set(id);
    this.needScrollToBottom = true;
  }

  sendMessage() {
    const text = this.newMessage().trim();
    if (!text) return;

    const currentContact = this.selectedContact();
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today';

    const newMsg: Message = {
      text,
      time: timeString,
      sender: 'me',
      senderName: 'Dr. Robert'
    };

    // Update contacts list with new message
    this.contacts.update(prevContacts => 
      prevContacts.map(c => {
        if (c.id === currentContact.id) {
          return {
            ...c,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    this.newMessage.set('');
    this.needScrollToBottom = true;

    // Trigger mock automated response after 1.5s
    setTimeout(() => {
      const replies = [
        "Received. I will update the medical chart accordingly.",
        "Understood. Let's discuss this during the rounds.",
        "Thanks for the update. I'll follow up shortly.",
        "Acknowledged. Please keep me posted on any changes.",
        "Thank you, Doctor. I'm on it."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const incomingMsg: Message = {
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
        sender: 'other',
        senderName: currentContact.name
      };

      this.contacts.update(prevContacts => 
        prevContacts.map(c => {
          if (c.id === currentContact.id) {
            return {
              ...c,
              messages: [...c.messages, incomingMsg]
            };
          }
          return c;
        })
      );
      this.needScrollToBottom = true;
    }, 1200);
  }

  ngAfterViewChecked() {
    if (this.needScrollToBottom && this.scrollable) {
      this.scrollable.scrollTo({ bottom: 0, duration: 200 });
      this.needScrollToBottom = false;
    }
  }
}
