const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction");
const { default: axios } = require('axios');

zokou({ nomCom: "bot1", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg || !arg[0]) {
    return repondre("Oui, je t'écoute. Dis-moi.");
  }

  try {
    const message = await traduire(arg.join(' '), { to: 'fr' });
    console.log(message);

    const response = await axios.get(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${message}`);
    const botResponse = response.data.cnt;
    console.log(botResponse);

    const translatedResponse = await traduire(botResponse, { to: 'fr' });
    repondre(translatedResponse);
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre('Oops, une erreur s\'est produite.');
  }
});

zokou({ nomCom: "dalle1", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Veuillez entrer les informations nécessaires pour générer l'image.");
    }

    const image = arg.join(' ');
    const response = await axios.get(`https://imageai.codingteamapi.workers.dev/?gen=${image}&token=CTAPI-012AXEVMWcICYNTGnpEfqMTuRI`);
    const data = response.data;
    let caption = '*Powered by HACKING-MD*';

    if (data.status && data.owner && data.data) {
      const imageUrl = data.data;
      zk.sendMessage(dest, { image: { url: imageUrl }, caption: caption });
    } else {
      repondre("Erreur lors de la génération de l'image.");
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oops, une erreur s'est produite lors du traitement de votre demande.");
  }
});

zokou({ nomCom: "gpt1", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre(`Veuillez poser une question s'il vous plaît.`);
    }

    const question = arg.join(' ');
    const response = await axios.get(`https://api.openai.com/v1/engines/davinci-codex/completions?prompt=${question}`, {
      headers: {
        'Authorization': `Bearer ${process.env.sk-proj-3twvnUBCBO31LqCzEklIT3BlbkFJ9SyJiKFl2tGndxLgNYoA}`
      }
    });

    const data = response.data;
    if (data && data.choices && data.choices.length > 0) {
      repondre(data.choices[0].text);
    } else {
      repondre("Erreur lors de la génération de la réponse.");
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oops, une erreur s'est produite lors du traitement de votre demande.");
  }
});
