import { ChatSession, ChatMessage } from '@/types/chat';

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function createSampleData(): ChatSession[] {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 86400000);
  const twoDaysAgo = new Date(now.getTime() - 86400000 * 2);

  const session1: ChatSession = {
    id: generateId(),
    title: 'Grup Keluarga Besar',
    participants: ['Papa', 'Mama', 'Kakak Rina', 'Adek Bayu', 'Om Tono', 'Tante Sari'],
    messages: [
      createMsg(twoDaysAgo, '07:30', 'Papa', 'Selamat pagi semuanya, semoga hari ini lancar ya'),
      createMsg(twoDaysAgo, '07:32', 'Mama', 'Pagi pa, udah sarapan?'),
      createMsg(twoDaysAgo, '07:33', 'Papa', 'Udah ma, nasi goreng spesial buatanmu'),
      createMsg(twoDaysAgo, '08:15', 'Kakak Rina', 'Pagi semua, hari ini aku ada meeting sampai sore'),
      createMsg(twoDaysAgo, '08:16', 'Mama', 'Semangat kakak, jangan lupa makan siang'),
      createMsg(twoDaysAgo, '09:00', 'Adek Bayu', 'Pagi, info nih besok ada acara arisan di rumah tante Sari'),
      createMsg(twoDaysAgo, '09:05', 'Tante Sari', 'Iya bener, jam 10 pagi ya semuanya. Udah aku siapin lontong sayur'),
      createMsg(twoDaysAgo, '09:06', 'Om Tono', 'Oke siap, saya bawa kue'),
      createMsg(twoDaysAgo, '09:10', 'Mama', 'Aku bawa kue lapis dan es buah'),
      createMsg(twoDaysAgo, '12:00', 'Papa', 'Siapa yang mau dijemput? Saya pulang siang ini'),
      createMsg(twoDaysAgo, '12:05', 'Kakak Rina', 'Aku pulang sendiri pa, ada gojek'),
      createMsg(twoDaysAgo, '18:30', 'Mama', 'Makan malam udah siap, yang di rumah merapat'),
      createMsg(twoDaysAgo, '18:35', 'Adek Bayu', 'Otw pulang ma, 15 menit lagi'),
      createMsg(yesterday, '07:00', 'Papa', 'Pagi, jangan lupa hari ini arisan'),
      createMsg(yesterday, '07:05', 'Mama', 'Iya pa, aku udah siapin semuanya'),
      createMsg(yesterday, '09:30', 'Tante Sari', 'Yang dekat-dekat boleh bantu angkat meja ya'),
      createMsg(yesterday, '09:35', 'Om Tono', 'Saya bantu om, saya bawa kue brownies'),
      createMsg(yesterday, '10:00', 'Kakak Rina', 'Aku udah sampai nih di depan'),
      createMsg(yesterday, '10:05', 'Adek Bayu', 'Aku juga baru nyampe, parkir dulu'),
      createMsg(yesterday, '10:30', 'Mama', 'Acara arisan seru banget, foto-foto nanti dishare ya'),
      createMsg(yesterday, '10:31', 'Tante Sari', '<Media omitted>'),
      createMsg(yesterday, '10:32', 'Papa', '<Media omitted>'),
      createMsg(yesterday, '14:00', 'Kakak Rina', 'Alhamdulillah acara selesai, makasih semuanya'),
      createMsg(yesterday, '14:05', 'Mama', 'Terima kasih tante Sari udah host acaranya'),
      createMsg(yesterday, '14:06', 'Tante Sari', 'Sama-sama, seneng banget kumpul bareng'),
      createMsg(yesterday, '20:00', 'Papa', 'Selamat malam semuanya, istirahat yang cukup ya'),
      createMsg(now, '07:00', 'Mama', 'Pagi, semoga hari ini berkah'),
      createMsg(now, '07:05', 'Papa', 'Amin, pagi sayang'),
      createMsg(now, '07:30', 'Adek Bayu', 'Info: besok ada rapat keluarga online jam 8 malam'),
      createMsg(now, '07:35', 'Kakak Rina', 'Noted, aku bisa join'),
      createMsg(now, '07:36', 'Om Tono', 'Saya juga bisa'),
    ],
    createdAt: twoDaysAgo,
    updatedAt: now,
    messageCount: 32,
  };

  const session2: ChatSession = {
    id: generateId(),
    title: 'Chat dengan Ahmad - Proyek Website',
    participants: ['Ahmad Rizky', 'Saya'],
    messages: [
      createMsg(twoDaysAgo, '10:00', 'Ahmad Rizky', 'Halo bro, ada waktu diskusi sebentar?'),
      createMsg(twoDaysAgo, '10:05', 'Saya', 'Halo Ahmad, ada waktu. Ada apa?'),
      createMsg(twoDaysAgo, '10:06', 'Ahmad Rizky', 'Soal proyek website yang kita kerjain minggu lalu'),
      createMsg(twoDaysAgo, '10:07', 'Ahmad Rizky', 'Klien minta revisi beberapa hal'),
      createMsg(twoDaysAgo, '10:10', 'Saya', 'Oke, revisi apa aja?'),
      createMsg(twoDaysAgo, '10:12', 'Ahmad Rizky', '1. Homepage perlu diubah layoutnya jadi lebih modern'),
      createMsg(twoDaysAgo, '10:13', 'Ahmad Rizky', '2. Tambahin fitur newsletter di footer'),
      createMsg(twoDaysAgo, '10:14', 'Ahmad Rizky', '3. Form contact us perlu validasi lebih ketat'),
      createMsg(twoDaysAgo, '10:20', 'Saya', 'Oke, estimasi 2 hari kerja. Bisa kirim brief lengkapnya?'),
      createMsg(twoDaysAgo, '10:25', 'Ahmad Rizky', 'Ini briefnya <document omitted>'),
      createMsg(twoDaysAgo, '10:30', 'Saya', 'Diterima, saya cek dulu ya'),
      createMsg(yesterday, '09:00', 'Saya', 'Halo Ahmad, udah aku cek briefnya'),
      createMsg(yesterday, '09:01', 'Saya', 'Untuk layout homepage, aku suggest pakai hero section full width'),
      createMsg(yesterday, '09:05', 'Ahmad Rizky', 'Setuju, klien juga pengennya gitu'),
      createMsg(yesterday, '09:10', 'Saya', 'Aku mulai kerjain ya, progress update tiap sore'),
      createMsg(yesterday, '14:00', 'Saya', 'Update: homepage layout baru udah 70%'),
      createMsg(yesterday, '14:05', 'Ahmad Rizky', 'Cepet banget, kirim preview dong'),
      createMsg(yesterday, '14:10', 'Saya', 'Ini preview linknya <document omitted>'),
      createMsg(yesterday, '14:30', 'Ahmad Rizky', 'Mantap! Klien pasti suka ini'),
      createMsg(yesterday, '17:00', 'Saya', 'Newsletter dan form validasi juga udah selesai'),
      createMsg(yesterday, '17:05', 'Ahmad Rizky', 'Wah luar biasa, besok bisa deploy?'),
      createMsg(yesterday, '17:10', 'Saya', 'Bisa, tinggal final review'),
      createMsg(now, '08:00', 'Ahmad Rizky', 'Pagi, udah siap deploy?'),
      createMsg(now, '08:05', 'Saya', 'Pagi, udah siap semua. Deploy jam 10 ya?'),
      createMsg(now, '08:06', 'Ahmad Rizky', 'Siap, aku standby'),
      createMsg(now, '10:00', 'Saya', 'Website udah live! Cek di https://proyek-client.vercel.app'),
      createMsg(now, '10:05', 'Ahmad Rizky', 'Keren bro! Klien bilang puas banget'),
      createMsg(now, '10:10', 'Saya', 'Alhamdulillah, makasih atas kerjasamanya'),
    ],
    createdAt: twoDaysAgo,
    updatedAt: now,
    messageCount: 28,
  };

  const session3: ChatSession = {
    id: generateId(),
    title: 'Grup Kerja - Tim Marketing',
    participants: ['Budi Manager', 'Dewi', 'Fajar', 'Saya'],
    messages: [
      createMsg(twoDaysAgo, '08:00', 'Budi Manager', 'Selamat pagi tim, minggu ini target kita naik 20%'),
      createMsg(twoDaysAgo, '08:05', 'Dewi', 'Pagi pak, siap! Strateginya seperti apa?'),
      createMsg(twoDaysAgo, '08:10', 'Budi Manager', 'Fokus ke digital marketing dan social media campaign'),
      createMsg(twoDaysAgo, '08:15', 'Fajar', 'Pagi pak, untuk budget campaign minggu ini gimana?'),
      createMsg(twoDaysAgo, '08:20', 'Budi Manager', 'Budget tetap 50 juta, tapi harus lebih efisien'),
      createMsg(twoDaysAgo, '09:00', 'Saya', 'Saya siapin content calendar untuk minggu ini'),
      createMsg(twoDaysAgo, '09:05', 'Dewi', 'Aku handle Instagram dan TikTok ya'),
      createMsg(twoDaysAgo, '09:06', 'Fajar', 'Aku fokus Google Ads dan SEO'),
      createMsg(twoDaysAgo, '14:00', 'Budi Manager', 'Meeting jam 3 sore ya, jangan telat'),
      createMsg(twoDaysAgo, '14:05', 'Dewi', 'Siap pak'),
      createMsg(yesterday, '09:00', 'Saya', 'Update: content calendar udah jadi <document omitted>'),
      createMsg(yesterday, '09:10', 'Budi Manager', 'Bagus, aku review dulu'),
      createMsg(yesterday, '11:00', 'Dewi', 'Instagram post hari ini udah upload, engagement naik 15%'),
      createMsg(yesterday, '11:05', 'Budi Manager', 'Good job Dewi!'),
      createMsg(yesterday, '11:30', 'Fajar', 'Google Ads CTR naik jadi 4.2%, Alhamdulillah'),
      createMsg(yesterday, '11:35', 'Budi Manager', 'Excellent! Tim solid'),
      createMsg(yesterday, '16:00', 'Budi Manager', 'Jangan lupa besok laporan mingguan jam 9 pagi'),
      createMsg(yesterday, '16:05', 'Saya', 'Siap pak, udah aku siapin'),
      createMsg(now, '08:30', 'Budi Manager', 'Pagi tim, siap untuk laporan?'),
      createMsg(now, '08:35', 'Dewi', 'Siap pak, udah print semua'),
      createMsg(now, '08:36', 'Fajar', 'Siap, data analytics juga udah ready'),
      createMsg(now, '08:40', 'Saya', 'Presentasi udah aku siapin, tinggal screen share'),
      createMsg(now, '09:00', 'Budi Manager', 'Oke meeting mulai, Fajar presentasi dulu ya'),
      createMsg(now, '09:30', 'Budi Manager', 'Luar biasa semuanya, target minggu ini tercapai!'),
    ],
    createdAt: twoDaysAgo,
    updatedAt: now,
    messageCount: 24,
  };

  const session4: ChatSession = {
    id: generateId(),
    title: 'Chat dengan Sarah - Teman Kuliah',
    participants: ['Sarah Amalia', 'Saya'],
    messages: [
      createMsg(twoDaysAgo, '19:00', 'Sarah Amalia', 'Halo! Lama nggak chat, kabar kamu gimana?'),
      createMsg(twoDaysAgo, '19:05', 'Saya', 'Halo Sarah! Kabar baik, kamu gimana?'),
      createMsg(twoDaysAgo, '19:06', 'Sarah Amalia', 'Alhamdulillah baik, udah kerja di Jakarta'),
      createMsg(twoDaysAgo, '19:10', 'Saya', 'Wah keren! Kerja di mana?'),
      createMsg(twoDaysAgo, '19:12', 'Sarah Amalia', 'Di salah satu tech company, jadi UI/UX designer'),
      createMsg(twoDaysAgo, '19:15', 'Saya', 'Mantap! Passion kamu emang di situ'),
      createMsg(twoDaysAgo, '19:20', 'Sarah Amalia', 'Iya nih, akhirnya kesampaian juga'),
      createMsg(twoDaysAgo, '19:25', 'Sarah Amalia', 'Kamu masih di Bandung?'),
      createMsg(twoDaysAgo, '19:30', 'Saya', 'Masih, tapi sering ke Jakarta juga buat meeting'),
      createMsg(twoDaysAgo, '19:35', 'Sarah Amalia', 'Nanti kalau ke Jakarta kabarin ya, kita ngopi'),
      createMsg(twoDaysAgo, '19:40', 'Saya', 'Deal! Minggu depan aku ada meeting di Jakarta'),
      createMsg(twoDaysAgo, '19:42', 'Sarah Amalia', 'Gas! Aku tunggu kabarnya'),
      createMsg(yesterday, '20:00', 'Sarah Amalia', 'Besok meetingnya jam berapa?'),
      createMsg(yesterday, '20:05', 'Saya', 'Jam 10 pagi, selesainya kayaknya siang'),
      createMsg(yesterday, '20:06', 'Sarah Amalia', 'Oke, aku free sore. Ngopinya jam 4 gimana?'),
      createMsg(yesterday, '20:10', 'Saya', 'Oke pas! Di mana?'),
      createMsg(yesterday, '20:12', 'Sarah Amalia', 'Di kopi kenangan dekat kantorku aja ya'),
      createMsg(yesterday, '20:15', 'Saya', 'Siap, aku catat'),
      createMsg(now, '15:00', 'Saya', 'Halo Sarah, meeting udah selesai'),
      createMsg(now, '15:05', 'Sarah Amalia', 'Otw ke kopi kenangan ya, 15 menit lagi nyampe'),
      createMsg(now, '15:06', 'Saya', 'Oke, aku juga otw'),
      createMsg(now, '16:30', 'Sarah Amalia', 'Seneng banget ketemu kamu! Lama nggak ngobrol'),
      createMsg(now, '16:35', 'Saya', 'Sama! Nanti harus ketemu lagi ya'),
      createMsg(now, '16:40', 'Sarah Amalia', 'Iya, keep in touch ya!'),
    ],
    createdAt: twoDaysAgo,
    updatedAt: now,
    messageCount: 24,
  };

  // Fix message timestamps
  [session1, session2, session3, session4].forEach(session => {
    session.messages.forEach(msg => {
      msg.isGroup = session.participants.length > 2;
      msg.id = generateId();
    });
  });

  return [session1, session2, session3, session4];
}

function createMsg(date: Date, timeStr: string, sender: string, content: string): ChatMessage {
  const [h, m] = timeStr.split(':').map(Number);
  const ts = new Date(date);
  ts.setHours(h, m, 0, 0);
  return {
    id: generateId(),
    timestamp: ts,
    sender,
    content,
    type: content.includes('<Media omitted>') || content.includes('<document omitted>') ? 'image' : 'text',
    isGroup: false,
  };
}
