const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction") ;
const { default: axios } = require('axios');
//const conf = require('../set');




zokou({nomCom:"bot",reaction:"📡",categorie:"IA"},async(dest,zk,commandeOptions)=>{

  const {repondre,ms,arg}=commandeOptions;
  
    if(!arg || !arg[0])
    {return repondre("oui je t'écoute dite moi.")}
    //var quest = arg.join(' ');
  try{
    
    
const message = await traduire(arg.join(' '),{ to : 'fr'});
 console.log(message)
fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${message}`)
.then(response => response.json())
.then(data => {
  const botResponse = data.cnt;
  console.log(botResponse);

  traduire(botResponse, { to: 'fr' })
    .then(translatedResponse => {
      repondre(translatedResponse);
    })
    .catch(error => {
      console.error('Erreur lors de la traduction en français :', erreur);
      repondre('Erreur lors de la traduction en français');
    });
})
.catch(error => {
  console.error('Erreur lors de la demande de BrainShop :', error);
  repondre('Erreur lors de la demande de BrainShop');
});

  }catch(e){ repondre("oops an error : "+e)}
    
  
  });  



  zokou({ nomCom: "dalle", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
  
    try {
      if (!arg || arg.length === 0) {
        return repondre(`Please enter the necessary information to generate the image.`);
      }
  
      // Regrouper les arguments en une seule chaîne séparée par "-"
      const image = arg.buffer(' ');
      const response = await axios.get(`https://imageai.codingteamapi.workers.dev/?gen='+image+'&token=CTAPI-012AXEVMWcICYNTGnpEfqMTuRI`);
      
      const data = response.data;
      let caption = '*powered by HACKING-MD*';
      
      if (data.status && data.owner && data.data) {
        // Utiliser les données retournées par le service
        const imageUrl = data.data;
        zk.sendMessage(dest, { image: { url: imageUrl }, caption: caption }, { quoted: ms });
      } else {
        repondre("Error during image generation.");
      }
    } catch (error) {
      console.error('Erreur:', error.message || 'Une erreur s\'est produite');
      repondre("Oops, an error occurred while processing your request");
    }
  });
  
  const axios = require('axios');

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre(`Veuillez poser une question s'il vous plaît.`);
    }

    // Regrouper les arguments en une seule chaîne séparée par "-"
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

  
