const {zokou}=require("../framework/zokou")



zokou({nomCom:"clear",categorie:"General",reaction:"🎚"},async(dest,z,com)=>{




	},
	async (message, match) => {
		await message.clearChat(message.jid)
		await message.send('_Cleared_')
	}
)