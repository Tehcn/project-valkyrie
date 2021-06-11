const { hypixel_key } = require("./config.json");
const fetch = require('node-fetch');
const { ExpToLevel } = require('./ExpToLevel');

class SPlayer {
    constructor(username) {
        this.username = username;
        this.uuid = null;
    }

    async Init() {
        this.uuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${this.username}`)
            .then(data => data.json())
            .then(json => json.id)
            .catch(err => console.error(err));
        return this.uuid;
    }

    async GetSkillLevel(skill="mining") {
        var runecrafting = false;
        if(skill.toLowerCase == "runecrafting") { runecrafting = true}
        
        if(skill.toLowerCase() == "catacombs") {
            return await fetch(`https://api.hypixel.net/skyblock/profiles?key=${hypixel_key}&uuid=${this.uuid}`)
                .then(data => data.json())
                .then(json => ExpToLevel(Number.parseFloat(json.profiles[0].members[`${this.uuid}`].dungeons.dungeon_types.catacombs.experience)))
                .catch(err => err)
        }
        
        return await fetch(`https://api.hypixel.net/skyblock/profiles?key=${hypixel_key}&uuid=${this.uuid}`)
            .then(data => data.json())
            .then(json => ExpToLevel(Number.parseFloat(json.profiles[0].members[`${this.uuid}`][`experience_skill_${skill}`]), runecrafting))
            .catch(err => err)

    }
}

module.exports = {
    name: "Skyblock",
    description: "Skyblock stuff",
    Player: SPlayer
}