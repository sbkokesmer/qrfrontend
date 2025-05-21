import React, { useState } from 'react';
import logo from '../assets/peekwhite.png';

const questionsByArea: Record<string, string[]> = {
  frontend: [
    'Hangi frontend framework\'lerini biliyorsunuz?',
    'React ile ne kadar deneyiminiz var?',
    'CSS konusunda kendinizi nasıl değerlendirirsiniz?',
    'JavaScript ES6+ özelliklerini kullanabiliyor musunuz?'
  ],
  backend: [
    'Hangi backend dillerini kullanıyorsunuz?',
    'Veritabanı deneyiminiz nedir?',
    'RESTful API geliştirme konusunda tecrübeniz var mı?',
    'Node.js ile çalıştınız mı?'
  ],
  devops: [
    'Hangi CI/CD araçlarını kullandınız?',
    'Bulut servisleri hakkında bilginiz var mı?',
    'Docker ve Kubernetes deneyiminiz nedir?',
    'Sunucu yönetimi konusunda deneyiminiz nedir?'
  ],
  'grafik tasarım': [
    'Hangi tasarım programlarını kullanıyorsunuz?',
    'Logo tasarımı konusunda deneyiminiz nedir?',
    'UX/UI prensipleri konusunda deneyiminiz nedir?',
    'Hangi tasarım projelerinde aktif rol aldınız?'
  ],
  'sosyal medya': [
    'Hangi sosyal medya platformlarında deneyiminiz var?',
    'İçerik üretimi yapıyor musunuz?',
    'Sosyal medya reklamları hakkında bilginiz var mı?',
    'Analitik araçları kullanabiliyor musunuz?'
  ],
  'siber güvenlik': [
    'Hangi siber güvenlik araçlarını kullandınız?',
    'Penetrasyon testi deneyiminiz var mı?',
    'Bilgi güvenliği politikaları hakkında bilginiz var mı?',
    'Saldırı tespiti ve önleme sistemleri ile çalıştınız mı?'
  ],
  'full stack': [
    'Frontend ve backend teknolojilerinde deneyiminiz nedir?',
    'Veritabanı yönetimi konusunda tecrübeniz var mı?',
    'RESTful API ve GraphQL hakkında bilginiz var mı?',
    'Deployment süreçlerinde yer aldınız mı?'
  ],
  'mobil programlama': [
    'Hangi mobil platformlarda uygulama geliştirdiniz?',
    'React Native veya Flutter kullanıyor musunuz?',
    'Mobil uygulama performansı iyileştirme konusunda deneyiminiz nedir?',
    'Uygulama yayınlama süreçlerinde deneyiminiz nedir?'
  ],
};

const totalSteps = 5;

const UploadPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const area = answers.area;

  const handleNext = () => {
    if (step === 0 && !answers.area) {
      alert('Lütfen bir alan seçiniz.');
      return;
    }
    if (step > 0 && step < totalSteps - 1) {
      const answerKey = `q${step}`;
      const answerValue = answers[answerKey];
      const otherValue = answers[`${answerKey}_other`];

      if (!answerValue || (answerValue === 'Diğer' && (!otherValue || otherValue.trim() === ''))) {
        
        return;
      }
      // If "Diğer" is selected, update main answer with other text before advancing
      if (answerValue === 'Diğer' && otherValue && otherValue.trim() !== '') {
        setAnswers((prev: any) => ({ ...prev, [answerKey]: otherValue }));
      }
    }
    setStep((prev: number) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prev: number) => Math.max(prev - 1, 0));
  };

  function getOptionsForQuestion(area: string, index: number): string[] {
    if (!area) return [];
    const optionsByArea: Record<string, Record<number, string[]>> = {
      frontend: {
        0: ['React', 'Vue', 'Angular', 'Diğer'],
        1: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Diğer'],
        2: ['Başlangıç', 'Orta', 'İyi', 'Uzman'],
        3: ['Evet', 'Hayır', 'Kısmen', 'Diğer'],
      },
      backend: {
        0: ['Node.js', 'Python', 'Java', 'Diğer'],
        1: ['SQL', 'NoSQL', 'Her ikisi', 'Hiç'],
        2: ['Evet', 'Hayır', 'Kısmen', 'Diğer'],
        3: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Hiç'],
      },
      devops: {
        0: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Diğer'],
        1: ['AWS', 'Azure', 'Google Cloud', 'Hiç'],
        2: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Hiç'],
        3: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Hiç'],
      },
      'grafik tasarım': {
        0: ['Photoshop', 'Illustrator', 'Figma', 'Diğer'],
        1: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Hiç'],
        2: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Hiç'],
        3: ['Afiş / Sosyal Medya Tasarımı', 'Logo / Kurumsal Kimlik', 'Web UI Tasarımı', 'Mobil Uygulama Arayüzü', 'Diğer'],
      },
      'sosyal medya': {
        0: ['Instagram', 'Facebook', 'LinkedIn', 'TikTok'],
        1: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Hiç'],
        2: ['Evet', 'Hayır', 'Kısmen', 'Diğer'],
        3: ['Evet', 'Hayır', 'Biraz', 'Diğer'],
      },
      'siber güvenlik': {
        0: ['Nmap', 'Wireshark', 'Metasploit', 'Diğer'],
        1: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Hiç'],
        2: ['Evet', 'Hayır', 'Kısmen', 'Diğer'],
        3: ['Evet', 'Hayır', 'Biraz', 'Diğer'],
      },
      'full stack': {
        0: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Hiç'],
        1: ['SQL', 'NoSQL', 'Her ikisi', 'Hiç'],
        2: ['RESTful API', 'GraphQL', 'Her ikisi', 'Hiç'],
        3: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Hiç'],
      },
      'mobil programlama': {
        0: ['iOS (Swift)', 'Android (Kotlin)', 'React Native', 'Diğer'],
        1: ['Başlangıç', 'Orta', 'İyi', 'Uzman'],
        2: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Uzman'],
        3: ['0-2 yıl', '2-4 yıl', '4+ yıl', 'Hiç'],
      },
    };
    return optionsByArea[area]?.[index] || [];
  }

  const handleAnswerChange = (value: string) => {
    const key = `q${step}`;
    const updatedAnswers = { ...answers, [key]: value };
    setAnswers(updatedAnswers);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnswers({ area: e.target.value });
    setStep(1);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Dosya eksik.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setStatus('Dosya boyutu 10MB’ı geçmemelidir.');
      return;
    }
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setStatus('Lütfen İsim Soyisim, Telefon ve E-posta alanlarını doldurunuz.');
      return;
    }

    const formData = new FormData();
    formData.append('cv', file);
    formData.append('name', name.trim());
    formData.append('phone', phone.trim());
    formData.append('email', email.trim());
    // Append selected area and answers to formData
    formData.append('area', area);
    formData.append('answers', JSON.stringify(answers));

    setIsUploading(true);
    try {
      const response = await fetch('https://qrcv-backend-app-36f8990e2cae.herokuapp.com/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setStatus(data.message || 'Yükleme tamamlandı');
      setStep(totalSteps + 1);
    } catch (err) {
      console.error(err);
      setStatus('Bir hata oluştu');
    } finally {
      setIsUploading(false);
    }
  };

  const progressPercent = (step / totalSteps) * 100;
  const currentAnswerKey = `q${step}`;
  const currentAnswer = answers[currentAnswerKey] || '';
  const isOtherSelected = currentAnswer === 'Diğer';

  let content;
  if (step === 0) {
    content = (
      <>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>İlgilendiğiniz Alanı Seçin</h1>
        <select
          value={answers.area || ''}
          onChange={handleAreaChange}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '6px', maxWidth: '90vw', marginBottom: '20px' }}
        >
          <option value="" disabled>Alan seçiniz</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="devops">DevOps</option>
          <option value="grafik tasarım">Grafik Tasarım</option>
          <option value="sosyal medya">Sosyal Medya</option>
          <option value="siber güvenlik">Siber Güvenlik</option>
          <option value="full stack">Full Stack</option>
          <option value="mobil programlama">Mobil Programlama</option>
        </select>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          <button disabled style={{ opacity: 0.5 }}>Geri</button>
        </div>
      </>
    );
  } else if (step === totalSteps) {
    content = (
      <>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>CV'ni Buradan Ekleyebilirsin</h1>
        <p style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#aaa' }}>
          Desteklenen dosya türleri: PDF, DOC, DOCX
        </p>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="İsim Soyisim"
          style={{
            background: '#fff',
            color: '#000',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '10px',
            maxWidth: '60%',
            width: '100%',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Telefon"
          style={{
            background: '#fff',
            color: '#000',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '10px',
            maxWidth: '60%',
            width: '100%',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="E-posta"
          style={{
            background: '#fff',
            color: '#000',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '20px',
            maxWidth: '60%',
            width: '100%',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{
            background: '#fff',
            color: '#000',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '20px',
            width: '100%',
            maxWidth: '50%',
            boxSizing: 'border-box',
            textAlign: 'center',
            display: 'block',
          }}
        />
        {file && (
          <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '8px' }}>
            Seçilen dosya: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          <button onClick={handleBack}>Geri</button>
          <button style={{ width: '200px', maxWidth: '90vw' }} onClick={handleUpload} disabled={isUploading}>
            {isUploading ? 'Yükleniyor...' : 'Yükle'}
          </button>
        </div>
        {status && <p style={{ marginTop: '20px' }}>{status}</p>}
      </>
    );
  } else if (step === totalSteps + 1) {
    content = (
      <>
        <h1>Katılımınız için teşekkür ederiz!</h1>
        <p>Form verileriniz başarıyla alındı.</p>
      </>
    );
  } else {
    content = (
      <>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Soru {step} / {totalSteps - 1}</h1>
        <p style={{ marginBottom: '10px', fontSize: '1rem' }}>
          {questionsByArea[area][step - 1]}
        </p>
        <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', marginBottom: '20px' }}>
          {getOptionsForQuestion(area, step - 1).map((option, idx) => {
            const isChecked = currentAnswer === option;
            return (
              <label
                key={idx}
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  padding: '10px',
                  borderRadius: '6px',
                  backgroundColor: isChecked ? '#444' : '#222',
                  color: '#fff',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = isChecked ? '#555' : '#333')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = isChecked ? '#444' : '#222')}
              >
                <input
                  type="radio"
                  name={currentAnswerKey}
                  value={option}
                  checked={isChecked}
                  onChange={() => handleAnswerChange(option)}
                  style={{ marginRight: '8px' }}
                />
                {option}
              </label>
            );
          })}
          {isOtherSelected && (
            <>
              <input
                type="text"
                value={answers[`${currentAnswerKey}_other`] || ''}
                onChange={(e) => {
                  const otherValue = e.target.value;
                  setAnswers((prev: any) => ({ ...prev, [`${currentAnswerKey}_other`]: otherValue }));
                }}
                placeholder="Lütfen belirtiniz"
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '1rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginTop: '8px'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <button onClick={handleBack}>Geri</button>
                <button onClick={handleNext}>İleri</button>
              </div>
            </>
          )}
          {!isOtherSelected && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
              <button onClick={handleBack}>Geri</button>
              <button onClick={handleNext}>İleri</button>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      {/* Logo at the top center */}
      <img src={logo} alt="Logo" style={{ width: '120px', marginBottom: '30px', marginTop: '20px' }} />
      <div style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
        <div style={{ height: '10px', backgroundColor: '#eee', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#4caf50', transition: 'width 0.3s' }} />
        </div>
        <p style={{ marginTop: '8px' }}>{`Adım ${Math.min(step, totalSteps + 1)} / ${totalSteps + 1}`}</p>
      </div>
      {content}
    </div>
  );
};

export default UploadPage;
