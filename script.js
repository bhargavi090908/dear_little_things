const $=id=>document.getElementById(id);
let lang='en', selectedOccasion='', selectedTemplate=null, photoUrl='';
const occasionData={
 birthday:{emoji:'🎂',en:'Birthday',te:'పుట్టినరోజు',templates:[
  {id:'birthday-bloom',name:'Birthday Bloom',te:'బర్త్‌డే బ్లూమ్',price:99,desc:'Pastel cake, confetti and a heartfelt birthday note.',emoji:'🎂',style:'rose'},
  {id:'birthday-scrapbook',name:'Birthday Scrapbook',te:'బర్త్‌డే స్క్రాప్‌బుక్',price:199,desc:'A memory-style layout with photo and favourite moments.',emoji:'🎀',style:'peach'},
  {id:'birthday-surprise',name:'Birthday Surprise',te:'బర్త్‌డే సర్ప్రైజ్',price:299,desc:'Extra sections, surprise reveal and more animations.',emoji:'🎉',style:'lavender'}]},
 anniversary:{emoji:'💐',en:'Anniversary',te:'వార్షికోత్సవం',templates:[
  {id:'anniversary-letter',name:'Our Little Story',te:'మన చిన్న కథ',price:99,desc:'A sweet letter celebrating your journey together.',emoji:'💌',style:'rose'},
  {id:'anniversary-timeline',name:'Memory Timeline',te:'జ్ఞాపకాల టైమ్‌లైన్',price:199,desc:'Add dates, milestones and favourite memories.',emoji:'🌷',style:'lavender'},
  {id:'anniversary-premium',name:'Forever & Always',te:'ఎప్పటికీ మనమే',price:299,desc:'A richer layout with photo moments and surprise sections.',emoji:'💞',style:'peach'}]},
 firstmessage:{emoji:'💌',en:'First message',te:'మొదటి మెసేజ్',templates:[
  {id:'firstmessage-note',name:'That First Hello',te:'ఆ మొదటి హలో',price:99,desc:'A cute page about the message that started it all.',emoji:'💬',style:'rose'},
  {id:'firstmessage-chat',name:'Chat Memories',te:'చాట్ జ్ఞాపకాలు',price:199,desc:'Highlight funny lines and moments from your first chats.',emoji:'📱',style:'lavender'},
  {id:'firstmessage-story',name:'How It Began',te:'ఎలా మొదలైంది',price:299,desc:'A story-style page with chapters and a final reveal.',emoji:'✨',style:'peach'}]},
 proposal:{emoji:'💍',en:'Proposal',te:'ప్రపోజల్',templates:[
  {id:'proposal-question',name:'The Big Question',te:'ఆ ప్రత్యేక ప్రశ్న',price:99,desc:'A simple romantic page with a special question.',emoji:'💍',style:'rose'},
  {id:'proposal-reveal',name:'Open My Heart',te:'మనసు విప్పి చెప్పడం',price:199,desc:'A letter, photo and a gentle reveal interaction.',emoji:'💗',style:'peach'},
  {id:'proposal-story',name:'A Story of Us',te:'మన కథ',price:299,desc:'A multi-section proposal page with custom moments.',emoji:'🌙',style:'lavender'}]},
 apology:{emoji:'🌷',en:'Apology',te:'క్షమాపణ',templates:[
  {id:'apology-letter',name:'A Sincere Note',te:'మనస్ఫూర్తిగా ఒక మాట',price:99,desc:'A calm, sincere page to say what you mean.',emoji:'📝',style:'mint'},
  {id:'apology-memory',name:'What You Mean to Me',te:'నువ్వు నాకు ఎంత ముఖ్యం',price:199,desc:'A thoughtful note with a favourite memory.',emoji:'🌷',style:'peach'},
  {id:'apology-promise',name:'A Fresh Start',te:'కొత్త ఆరంభం',price:299,desc:'A longer message with sections for reflection and hopes.',emoji:'🕊️',style:'lavender'}]},
 friendship:{emoji:'🫶',en:'Friendship',te:'స్నేహం',templates:[
  {id:'friendship-note',name:'Bestie Note',te:'బెస్టీ నోట్',price:99,desc:'A cheerful appreciation page for your friend.',emoji:'🫶',style:'rose'},
  {id:'friendship-scrapbook',name:'Our Chaos Book',te:'మన అల్లరి పుస్తకం',price:199,desc:'Photos, inside jokes and your favourite memories.',emoji:'📸',style:'peach'},
  {id:'friendship-premium',name:'Forever Besties',te:'ఎప్పటికీ బెస్టీస్',price:299,desc:'A bigger scrapbook with extra interactive moments.',emoji:'🌈',style:'lavender'}]},
 confession:{emoji:'💗',en:'Love confession',te:'ప్రేమను చెప్పడం',templates:[
  {id:'confession-letter',name:'A Little Confession',te:'ఒక చిన్న ప్రేమ మాట',price:99,desc:'A gentle letter to share your feelings.',emoji:'💗',style:'rose'},
  {id:'confession-flower',name:'Blooming Feelings',te:'వికసించే భావాలు',price:199,desc:'A floral page with a personal message and photo.',emoji:'🌸',style:'peach'},
  {id:'confession-reveal',name:'One Special Secret',te:'ఒక ప్రత్యేక రహస్యం',price:299,desc:'A multi-step reveal with extra personal sections.',emoji:'💌',style:'lavender'}]},
 thankyou:{emoji:'🎀',en:'Thank you',te:'ధన్యవాదాలు',templates:[
  {id:'thankyou-note',name:'A Thank You Note',te:'ధన్యవాదాల లేఖ',price:99,desc:'A warm message to show someone they matter.',emoji:'🎀',style:'mint'},
  {id:'thankyou-memories',name:'Little Things You Do',te:'మీరు చేసే చిన్న పనులు',price:199,desc:'List the little things you appreciate most.',emoji:'🌼',style:'peach'},
  {id:'thankyou-premium',name:'You Made a Difference',te:'మీ వల్ల మార్పు వచ్చింది',price:299,desc:'A longer gratitude story with photos and sections.',emoji:'✨',style:'lavender'}]},
 justbecause:{emoji:'☁️',en:'Just because',te:'ప్రత్యేక కారణం లేకుండా',templates:[
  {id:'justbecause-surprise',name:'A Random Little Gift',te:'ఒక చిన్న సర్ప్రైజ్',price:99,desc:'A surprise page for an ordinary day.',emoji:'☁️',style:'rose'},
  {id:'justbecause-letter',name:'Open When You Smile',te:'నవ్వినప్పుడు తెరవండి',price:199,desc:'A cute letter with memories and encouragement.',emoji:'💌',style:'mint'},
  {id:'justbecause-magic',name:'A Pocket of Magic',te:'చిన్న మ్యాజిక్',price:299,desc:'A multi-section surprise page for no reason at all.',emoji:'🪄',style:'lavender'}]}
};
const defaultMessages={
 en:{birthday:'I hope your day is full of lovely surprises, kind people, and reasons to smile. You deserve so much happiness.',anniversary:'I am grateful for the moments we have shared and the memories still waiting for us. Here is a little reminder of how much you mean to me.',firstmessage:'Sometimes one little hello becomes a memory you keep coming back to. I am glad our story began.',proposal:'There is something I have wanted to tell you from my heart. You make ordinary moments feel special, and I wanted to make this moment special too.',apology:'I want to say this sincerely. I care about you and about how my actions made you feel. I am listening, and I want to do better.',friendship:'Thank you for the laughs, the memories, and for being wonderfully you. You make ordinary days feel brighter, and I am lucky to have you in my life.',confession:'I have been keeping these words in my heart, and today I wanted to share them honestly. You mean something special to me.',thankyou:'Thank you for the little things you do, for showing up, and for being yourself. I appreciate you more than I always manage to say.',justbecause:'No special occasion is needed to remind you that you matter. Here is a little surprise just because you make life sweeter.'},
 te:{birthday:'మీ రోజు అందమైన సర్ప్రైజ్‌లు, మంచి మనుషులు, చిరునవ్వులతో నిండాలి. మీకు చాలా సంతోషం దక్కాలని కోరుకుంటున్నాను.',anniversary:'మనిద్దరం పంచుకున్న క్షణాలకు, ఇంకా ఎదురుచూస్తున్న జ్ఞాపకాలకు నేను కృతజ్ఞుడిని/కృతజ్ఞురాలిని. మీరు నాకు ఎంత ముఖ్యమో గుర్తు చేసే చిన్న గిఫ్ట్ ఇది.',firstmessage:'ఒక చిన్న హలో కూడా మనసులో నిలిచిపోయే జ్ఞాపకంగా మారొచ్చు. మన కథ అలా మొదలైనందుకు సంతోషంగా ఉంది.',proposal:'నా మనసులోని ఒక మాట మీతో నిజాయితీగా పంచుకోవాలనుకుంటున్నాను. మీరు సాధారణ క్షణాలను కూడా ప్రత్యేకంగా మారుస్తారు.',apology:'మనస్ఫూర్తిగా ఒక విషయం చెప్పాలనుకుంటున్నాను. మీరు నాకు ముఖ్యం, నా పనుల వల్ల మీకు ఎలా అనిపించిందో నేను అర్థం చేసుకోవాలనుకుంటున్నాను. ఇంకా బాగా చేయడానికి ప్రయత్నిస్తాను.',friendship:'నవ్వులకు, జ్ఞాపకాలకు, మీరుగా ఉన్నందుకు ధన్యవాదాలు. మీరు సాధారణ రోజులను కూడా అందంగా మారుస్తారు. మీలాంటి స్నేహితుడు/స్నేహితురాలు ఉండటం నా అదృష్టం.',confession:'నా మనసులో ఉన్న మాటలను నిజాయితీగా మీతో పంచుకోవాలనుకుంటున్నాను. మీరు నాకు ప్రత్యేకమైన వ్యక్తి.',thankyou:'మీరు చేసే చిన్న చిన్న పనులకు, నా పక్కన ఉండటానికి, మీరుగా ఉన్నందుకు ధన్యవాదాలు. నేను చెప్పేదానికంటే ఎక్కువగా మిమ్మల్ని అభినందిస్తున్నాను.',justbecause:'మీరు ముఖ్యమైనవారని చెప్పడానికి ప్రత్యేక సందర్భం అవసరం లేదు. నా జీవితాన్ని అందంగా మార్చే మీ కోసం ఈ చిన్న సర్ప్రైజ్.'}
};
const occasionLabel=(id)=>occasionData[id][lang]||occasionData[id].en;
function setStep(n){document.querySelectorAll('[data-step-indicator]').forEach(el=>{const x=Number(el.dataset.stepIndicator);el.classList.toggle('active',x===n);el.classList.toggle('done',x<n)})}
function showSection(id){['occasionSection','templateSection','detailsSection','previewSection'].forEach(x=>$(x).classList.toggle('hidden',x!==id));}
function renderTemplates(){
 const data=occasionData[selectedOccasion];$('templateHeading').textContent=lang==='en'?`Choose your ${data.en.toLowerCase()} design`:`${data.te} డిజైన్ ఎంచుకోండి`;
 $('templateGrid').innerHTML=data.templates.map(t=>`<article class="template-card"><div class="template-art ${t.style}">${t.emoji}<span>${data.en} · ${t.style}</span></div><div class="template-content"><h3>${lang==='en'?t.name:t.te}</h3><p>${lang==='en'?t.desc:'మీ సందేశం, జ్ఞాపకాలతో వ్యక్తిగతంగా మార్చుకోగల అందమైన డిజైన్.'}</p><div class="template-price-row"><div class="price">₹${t.price}<small>${lang==='en'?'example price':'ఉదాహరణ ధర'}</small></div></div><button class="choose-template" data-template="${t.id}">${lang==='en'?'Choose this template':'ఈ టెంప్లేట్ ఎంచుకోండి'} →</button></div></article>`).join('');
 $('templateGrid').querySelectorAll('[data-template]').forEach(btn=>btn.addEventListener('click',()=>chooseTemplate(btn.dataset.template)));
}
function chooseTemplate(id){selectedTemplate=occasionData[selectedOccasion].templates.find(t=>t.id===id);$('selectedEmoji').textContent=selectedTemplate.emoji;$('selectedTemplateName').textContent=lang==='en'?selectedTemplate.name:selectedTemplate.te;$('selectedPrice').textContent=`₹${selectedTemplate.price} · ${lang==='en'?'example price':'ఉదాహరణ ధర'}`;$('priceBoxName').textContent=lang==='en'?selectedTemplate.name:selectedTemplate.te;$('priceBoxPrice').textContent=`₹${selectedTemplate.price}`;$('message').value=defaultMessages[lang][selectedOccasion];setStep(3);showSection('detailsSection');$('detailsSection').scrollIntoView({behavior:'smooth',block:'start'})}
document.querySelectorAll('[data-occasion]').forEach(btn=>btn.addEventListener('click',()=>{selectedOccasion=btn.dataset.occasion;renderTemplates();setStep(2);showSection('templateSection');$('templateSection').scrollIntoView({behavior:'smooth',block:'start'})}));
$('backToOccasions').addEventListener('click',()=>{setStep(1);showSection('occasionSection');$('occasionSection').scrollIntoView({behavior:'smooth'})});
$('backToTemplates').addEventListener('click',()=>{renderTemplates();setStep(2);showSection('templateSection');$('templateSection').scrollIntoView({behavior:'smooth'})});
$('editDetails').addEventListener('click',()=>{setStep(3);showSection('detailsSection');$('detailsSection').scrollIntoView({behavior:'smooth'})});
$('homeLink').addEventListener('click',e=>{e.preventDefault();setStep(1);showSection('occasionSection');window.scrollTo({top:0,behavior:'smooth'})});
$('languageButton').addEventListener('click',()=>{lang=lang==='en'?'te':'en';document.documentElement.lang=lang;document.querySelectorAll('[data-en][data-te]').forEach(el=>el.innerHTML=el.dataset[lang]);$('languageButton').textContent=lang==='en'?'తెలుగు / English':'English / తెలుగు';if(selectedOccasion)renderTemplates();if(selectedTemplate){$('selectedTemplateName').textContent=lang==='en'?selectedTemplate.name:selectedTemplate.te;$('priceBoxName').textContent=lang==='en'?selectedTemplate.name:selectedTemplate.te;$('selectedPrice').textContent=`₹${selectedTemplate.price} · ${lang==='en'?'example price':'ఉదాహరణ ధర'}`;$('previewPriceLine').textContent=`${lang==='en'?'Selected template':'ఎంచుకున్న టెంప్లేట్'}: ₹${selectedTemplate.price} (${lang==='en'?'example price':'ఉదాహరణ ధర'})`;}});
$('detailsForm').addEventListener('submit',e=>{e.preventDefault();if(!selectedTemplate||!selectedOccasion)return;const recipient=$('recipient').value.trim(),message=$('message').value.trim();if(!recipient||!message)return;
$('previewKicker').textContent=lang==='en'?occasionData[selectedOccasion].en.toUpperCase()+' · MADE JUST FOR YOU':occasionData[selectedOccasion].te+' · మీ కోసం ప్రత్యేకంగా';
$('previewTitle').textContent=$('headline').value.trim()||(lang==='en'?selectedTemplate.name:selectedTemplate.te);
$('previewGreeting').textContent=lang==='en'?`Dear ${recipient} ♡`:`ప్రియమైన ${recipient} ♡`;
$('previewMessage').textContent=message;$('previewMemory').textContent=$('memory').value.trim();$('previewMemoryWrap').classList.toggle('hidden',!$('memory').value.trim());
$('previewSignoff').innerHTML=(lang==='en'?'With love,':'ప్రేమతో,')+'<br><b>'+safe($('sender').value.trim()||(lang==='en'?'Someone who cares':'మీ గురించి శ్రద్ధ ఉన్న వ్యక్తి'))+'</b>';
$('giftCard').className='gift-card '+$('colour').value;$('previewPriceLine').textContent=`${lang==='en'?'Selected template':'ఎంచుకున్న టెంప్లేట్'}: ₹${selectedTemplate.price} (${lang==='en'?'example price':'ఉదాహరణ ధర'})`;setStep(4);showSection('previewSection');$('previewSection').scrollIntoView({behavior:'smooth',block:'start'});});
function safe(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
$('photo').addEventListener('change',()=>{const f=$('photo').files[0];if(!f){$('previewPhotoWrap').classList.add('hidden');if(photoUrl)URL.revokeObjectURL(photoUrl);photoUrl='';return}if(!f.type.startsWith('image/')||f.size>5*1024*1024){alert('Please choose an image under 5 MB.');$('photo').value='';return}if(photoUrl)URL.revokeObjectURL(photoUrl);photoUrl=URL.createObjectURL(f);$('previewPhoto').src=photoUrl;$('previewPhotoWrap').classList.remove('hidden')});
$('startAgain').addEventListener('click',()=>{selectedOccasion='';selectedTemplate=null;$('detailsForm').reset();if(photoUrl)URL.revokeObjectURL(photoUrl);photoUrl='';$('previewPhoto').removeAttribute('src');$('previewPhotoWrap').classList.add('hidden');setStep(1);showSection('occasionSection');window.scrollTo({top:0,behavior:'smooth'})});
