const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const yt=require("../framework/dl/ytdl-core.js")
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");
//var fs =require("fs-extra")

		zokou({
  nomCom: "movie",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("quelle film  veux-tu.");
    return;
  }
	async (message, match) => {
		const movie = await getJson(
			`http://www.omdbapi.com/?apikey=742b2d09&t=${match}&plot=full`
		)
		if (movie.Response != 'True')
			return await message.send('*Not found*', {
				quoted: message.data,
			})
		let msg = ''
		const url = movie.Poster
		delete movie.Poster
		delete movie.Response
		delete movie.Ratings
		for (const data in movie)
			if (movie[data] != 'N/A') msg += `*${data} :* ${movie[data]}\n`
		if (url == 'N/A') return await message.send(msg.trim())
		return await message.sendFromUrl(url, { caption: msg.trim() })
	}
)
