const { zokou } = require('../framework/zokou');
const {ajouterUtilisateurAvecWarnCount , getWarnCountByJID , resetWarnCountByJID} = require('../bdd/warn')
const s = require("../set")


zokou(
    {
        nomCom : 'warn',
        categorie : 'Group'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser,verifGroupe,verifAdmin , msgRepondu , auteurMsgRepondu} = commandeOptions;
if(!verifGroupe ) {repondre('Vous avez pas acces a cette commandes ,demande lui en priver') ; return};

if(verifAdmin || superUser) {
   if(!msgRepondu){repondre(*Mentionner la personne idiot faut savoir a avertir*); return};
   
   if (!arg || !arg[0] || arg.join('') === '') {
    await ajouterUtilisateurAvecWarnCount(auteurMsgRepondu)
   let warn = await getWarnCountByJID(auteurMsgRepondu)
   let warnlimit = s.WARN_COUNT
   
   if( warn >= warnlimit ) { await repondre('Cet utilisateur a atteint le nombre maximum d\'avertissement , par consequent l'idiot  sera retirer ');
                zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove")
 } else { 

    var rest = warnlimit - warn ;
     repondre(`Cet utilisateur idiot a un avertissement en plus dans sont casier faire attention; nombre d'avertissement restan tu sera  viré: ${rest} `)
   }
} else if ( arg[0] === 'reset') { await resetWarnCountByJID(auteurMsgRepondu) 

    repondre("le nombre d'avertissement a été renitialiser pour cet utilisateur idiot faire attention")} else ( repondre('reply to a user by typing  .warn ou .warn reset'))
   
}  else {
    repondre('Vous avez besoins des droits d\'adminitration monsieur soit logique')
}
 
   });
