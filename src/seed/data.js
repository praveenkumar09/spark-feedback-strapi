'use strict';

/**
 * Starter question sets, loaded once when the database has no questionnaires. After that, editors change everything in the Strapi admin
 * (Content Manager > Questionnaire / Question): wording per language, order, and the branches.
 *
 * Wording in Bahasa Malay, Mandarin and Tamil was written by the developers (not a native speaker): have it reviewed before real use.
 * Branch: { when: 'YES' | 'NO' | 'ANY', next: '<question key>' }  (empty next = the questionnaire ends). First match wins.
 */
const q = (key, order, type, [en, ms, zh, ta], branches) => ({
  key, order, type,
  texts: [{ locale: 'en', text: en }, { locale: 'ms', text: ms }, { locale: 'zh', text: zh }, { locale: 'ta', text: ta }],
  branches,
});
const go = (when, next) => ({ when, next: next || '' });

module.exports = [
  {
    key: 'nftf-v1',
    channel: 'NFTF',
    title: 'Non face-to-face purchase (online / phone)',
    questions: [
      q('n1', 1, 'YES_NO', [
        'Was it easy for you to complete the purchase online?',
        'Adakah mudah untuk anda melengkapkan pembelian secara dalam talian?',
        '您在线上办理购买手续是否顺利轻松？',
        'ஆன்லைனில் வாங்கும் செயல்முறையை முடிப்பது உங்களுக்கு எளிதாக இருந்ததா?'],
        [go('YES', 'n3'), go('NO', 'n2')]),
      q('n2', 2, 'OPEN_TEXT', [
        'I am sorry to hear that. Could you tell me what made it difficult?',
        'Maaf mendengarnya. Boleh beritahu saya apa yang menyukarkan proses itu?',
        '很抱歉听到这样的情况。您能告诉我是哪里让您觉得困难吗？',
        'அதைக் கேட்க வருந்துகிறேன். எது கடினமாக இருந்தது என்று சொல்ல முடியுமா?'],
        [go('ANY', 'n3')]),
      q('n3', 3, 'YES_NO', [
        'Were the key benefits and terms of the policy clearly explained to you before you confirmed your purchase?',
        'Adakah manfaat utama dan terma polisi dijelaskan dengan jelas kepada anda sebelum anda mengesahkan pembelian?',
        '在您确认购买之前，保单的主要保障和条款是否已向您清楚说明？',
        'நீங்கள் வாங்குவதை உறுதிப்படுத்தும் முன், பாலிசியின் முக்கிய பலன்களும் விதிமுறைகளும் தெளிவாக விளக்கப்பட்டதா?'],
        [go('YES', 'n5'), go('NO', 'n4')]),
      q('n4', 4, 'OPEN_YES_NO', [
        'Would you like our customer care team to call you to go through the terms again?',
        'Adakah anda mahu pasukan khidmat pelanggan kami menghubungi anda untuk menerangkan semula terma tersebut?',
        '您是否希望我们的客户服务团队致电，再为您讲解一次条款？',
        'விதிமுறைகளை மீண்டும் விளக்க எங்கள் வாடிக்கையாளர் சேவைக் குழு உங்களை அழைக்க வேண்டுமா?'],
        [go('ANY', 'n5')]),
      q('n5', 5, 'YES_NO', [
        'Do you feel the plan and the premium you chose suit your needs?',
        'Adakah anda rasa pelan dan premium yang anda pilih sesuai dengan keperluan anda?',
        '您觉得所选的计划和保费符合您的需求吗？',
        'நீங்கள் தேர்ந்தெடுத்த திட்டமும் பிரீமியமும் உங்கள் தேவைகளுக்குப் பொருந்துவதாக உணர்கிறீர்களா?'],
        [go('YES', 'n7'), go('NO', 'n6')]),
      q('n6', 6, 'OPEN_TEXT', [
        'What would have suited you better?',
        'Apakah yang lebih sesuai untuk anda?',
        '什么样的安排会更适合您？',
        'எது உங்களுக்கு இன்னும் பொருத்தமாக இருந்திருக்கும்?'],
        [go('ANY', 'n7')]),
      q('n7', 7, 'YES_NO', [
        'Did you receive your policy documents within the time we promised?',
        'Adakah anda menerima dokumen polisi anda dalam tempoh yang kami janjikan?',
        '您是否在我们承诺的时间内收到了保单文件？',
        'நாங்கள் உறுதியளித்த காலத்திற்குள் உங்கள் பாலிசி ஆவணங்கள் கிடைத்தனவா?'],
        [go('ANY', 'n8')]),
      q('n8', 8, 'OPEN_YES_NO', [
        'Would you recommend buying an AIA policy online to your family or friends?',
        'Adakah anda akan mengesyorkan pembelian polisi AIA secara dalam talian kepada keluarga atau rakan anda?',
        '您会向家人或朋友推荐在线上购买友邦保单吗？',
        'AIA பாலிசியை ஆன்லைனில் வாங்குமாறு உங்கள் குடும்பத்தினருக்கும் நண்பர்களுக்கும் பரிந்துரைப்பீர்களா?'],
        [go('ANY', 'n9')]),
      q('n9', 9, 'OPEN_TEXT', [
        'Is there anything else you would like to tell us?',
        'Adakah apa-apa lagi yang ingin anda sampaikan kepada kami?',
        '您还有什么想告诉我们的吗？',
        'எங்களிடம் சொல்ல வேறு ஏதேனும் உள்ளதா?'],
        []),
    ],
  },
  {
    key: 'ftf-v1',
    channel: 'FTF',
    title: 'Face-to-face purchase (with an adviser)',
    questions: [
      q('f1', 1, 'YES_NO', [
        'Did your adviser introduce themselves and show you their identification?',
        'Adakah penasihat anda memperkenalkan diri dan menunjukkan kad pengenalan mereka?',
        '您的顾问是否自我介绍并出示了身份证明？',
        'உங்கள் ஆலோசகர் தன்னை அறிமுகப்படுத்தி அடையாள அட்டையைக் காட்டினாரா?'],
        [go('YES', 'f3'), go('NO', 'f2')]),
      q('f2', 2, 'OPEN_TEXT', [
        'Thank you for telling me. Could you share what happened?',
        'Terima kasih kerana memberitahu saya. Boleh anda kongsikan apa yang berlaku?',
        '谢谢您告诉我。您能说说发生了什么吗？',
        'சொன்னதற்கு நன்றி. என்ன நடந்தது என்பதைப் பகிர முடியுமா?'],
        [go('ANY', 'f3')]),
      q('f3', 3, 'YES_NO', [
        'Did your adviser take time to understand your needs and finances before suggesting a plan?',
        'Adakah penasihat anda meluangkan masa memahami keperluan dan kewangan anda sebelum mencadangkan pelan?',
        '在推荐计划之前，您的顾问是否花时间了解您的需求和财务状况？',
        'திட்டத்தைப் பரிந்துரைக்கும் முன், உங்கள் ஆலோசகர் உங்கள் தேவைகளையும் நிதி நிலையையும் புரிந்துகொள்ள நேரம் எடுத்தாரா?'],
        [go('ANY', 'f4')]),
      q('f4', 4, 'OPEN_YES_NO', [
        'Did your adviser explain the benefits, charges and exclusions of the policy in a way you understood?',
        'Adakah penasihat anda menerangkan manfaat, caj dan pengecualian polisi dengan cara yang anda faham?',
        '您的顾问是否用您能理解的方式说明了保单的保障、费用和除外责任？',
        'பாலிசியின் பலன்கள், கட்டணங்கள், விலக்குகளை உங்களுக்குப் புரியும் வகையில் ஆலோசகர் விளக்கினாரா?'],
        [go('YES', 'f6'), go('NO', 'f5')]),
      q('f5', 5, 'OPEN_TEXT', [
        'Which part was unclear to you?',
        'Bahagian mana yang kurang jelas bagi anda?',
        '哪一部分让您觉得不清楚？',
        'எந்தப் பகுதி உங்களுக்குத் தெளிவாக இல்லை?'],
        [go('ANY', 'f6')]),
      q('f6', 6, 'YES_NO', [
        'Did you feel pressured to buy the policy?',
        'Adakah anda berasa ditekan untuk membeli polisi ini?',
        '您是否觉得被迫购买这份保单？',
        'பாலிசியை வாங்க உங்களுக்கு அழுத்தம் கொடுக்கப்பட்டதாக உணர்ந்தீர்களா?'],
        [go('YES', 'f7'), go('NO', 'f8')]),
      q('f7', 7, 'OPEN_TEXT', [
        'We take this seriously. Could you tell me more? Our team may contact you.',
        'Kami mengambil perkara ini dengan serius. Boleh ceritakan lebih lanjut? Pasukan kami mungkin akan menghubungi anda.',
        '我们非常重视这一点。您能再多说一些吗？我们的团队可能会联系您。',
        'இதை நாங்கள் மிகவும் தீவிரமாக எடுத்துக்கொள்கிறோம். மேலும் சொல்ல முடியுமா? எங்கள் குழு உங்களைத் தொடர்புகொள்ளலாம்.'],
        [go('ANY', 'f8')]),
      q('f8', 8, 'OPEN_YES_NO', [
        'Would you recommend your adviser to your family or friends?',
        'Adakah anda akan mengesyorkan penasihat anda kepada keluarga atau rakan anda?',
        '您会把您的顾问推荐给家人或朋友吗？',
        'உங்கள் ஆலோசகரை உங்கள் குடும்பத்தினருக்கும் நண்பர்களுக்கும் பரிந்துரைப்பீர்களா?'],
        [go('ANY', 'f9')]),
      q('f9', 9, 'OPEN_TEXT', [
        'Is there anything else you would like to tell us?',
        'Adakah apa-apa lagi yang ingin anda sampaikan kepada kami?',
        '您还有什么想告诉我们的吗？',
        'எங்களிடம் சொல்ல வேறு ஏதேனும் உள்ளதா?'],
        []),
    ],
  },
  {
    key: 'general-v1',
    channel: 'GENERAL',
    title: 'Any other way of buying (fallback)',
    questions: [
      q('g1', 1, 'YES_NO', [
        'Are you happy with how your policy was arranged?',
        'Adakah anda berpuas hati dengan cara polisi anda diuruskan?',
        '您对保单的办理过程满意吗？',
        'உங்கள் பாலிசி ஏற்பாடு செய்யப்பட்ட விதத்தில் நீங்கள் திருப்தியடைகிறீர்களா?'],
        [go('YES', 'g3'), go('NO', 'g2')]),
      q('g2', 2, 'OPEN_TEXT', [
        'What could we have done better?',
        'Apakah yang boleh kami lakukan dengan lebih baik?',
        '我们哪些地方可以做得更好？',
        'நாங்கள் எதை இன்னும் சிறப்பாகச் செய்திருக்கலாம்?'],
        [go('ANY', 'g3')]),
      q('g3', 3, 'OPEN_YES_NO', [
        'Would you recommend AIA to your family or friends?',
        'Adakah anda akan mengesyorkan AIA kepada keluarga atau rakan anda?',
        '您会向家人或朋友推荐友邦吗？',
        'AIA-வை உங்கள் குடும்பத்தினருக்கும் நண்பர்களுக்கும் பரிந்துரைப்பீர்களா?'],
        []),
    ],
  },
];
