const { MessageEmbed } = require("discord.js")

module.exports = async (client, msg, content) => {
    let embeds = [
        new MessageEmbed()
        .setColor('EB7B03')
        .setImage('https://i.ibb.co/nPbsr8h/LPmit-Kev-DC-Rules-Banner.gif')
    ,
        new MessageEmbed()
        .setColor('EB7B03')
        .setDescription("```Wenn wir der Meinung sind, dass jemand diesen Discord Server zu einem weniger angenehmen Ort für andere macht, behalten wir uns das Recht vor den entsprechenden Nachrichten oder gegebenenfalls Accounts nach eigenem Ermessen zu verwarnen und sogar zu entfernen. Diese ganzen Regeln existieren nicht, um euch zu nerven, sondern dafür, dass ihr hier eine großartige Zeit verbringen könnt und Momente erlebt, an die ihr euch gerne zurückerinnert. Wir lieben Diskussionen, aber diese sollten stehts offen und mit Bedacht geführt werden. Leider sind dabei Regeln nötig, die dafür sorgen, dass die Diskussionen auf dem Server im zivilisierten Rahmen bleiben und nicht ausarten``` \n\n")
        .addFields([
            {
                name: "**1. __ALLGEMEINE REGELN__**",
                value: `
                    > − Die [Discord-Nutzungsbedingungen](https://discord.com/terms) und [Community-Richtlinien](https://discord.com/guidelines) werden strikt eingehalten
                    > − Die [Public Server Guidelines](https://support.discord.com/hc/de/articles/360035969312) werden strikt eingehalten
                    > − Das geltende deutsche Recht wird befolgt
                    > − Ausnahmen werden nur durch die Teamleitung durchgeführt
                    \u200b
                `
            },{
                name: "**2. __CHATVERHALTEN__**",
                value: `
> − Text- und Sprachchannel dürfen nur für ihren benannten Zweck verwendet werden
> − Bot-Commands dürfen nur im <#802258762965450812> Channel ausgeführt werden
> − Der <#803615219078266900> ist nur für Feedback, die direkt diesen Discord betreffen oder eines der laufenden LPmitKev Stream Projekte
> − Spamming, Flooding (Nachrichten, Emojis, Reaktionen, Bilder, GIFs) und Channel-Hopping, ist verboten
> − Unnötiges, übermäßiges Taggen und Ghost-Taggen von Usern und Team Mitgliedern, einschließlich Taggen ohne Nachricht ist verboten
> − Argumente, die zu Unruhen führen, einschließlich der Diskussion von politischen Angelegenheiten sind verboten
> − Weitergabe von persönlich identifizierbaren Informationen (z.B. Name, Adresse, E-Mail, Telefonnummer usw.) von sich selbst oder anderen ist verboten
> − ASCII oder etwas ähnliches, mit Ausnahme der Befehle `+"`/shrug`"+` und `+"`/tableflip`"+` ist verboten
> − Betteln ist generell verboten! - Dazu zählt auch Discord Nitro
\u200b
                `
            },{
                name: "**3. __VOICECHANNEL & SOUNDS__**",
                value: `
                    > - Musik darf nur in den vorgesehenen Voicechannel wiedergegeben werden
                    > - Wiedergabe von Musik außerhalb der vorgesehenen Voicechannel, unter Verwendung von Soundboards und Stimmenverzerrer ist verboten
                    > - Abspielen oder Hinzufügen von Musik, die eine obszön lange Dauer (>30 Minuten) hat oder Obszönitäten enthält ist verboten
                    > - Mit dem Betreten des Voicechannel „LPmitKev-Talk“ akzeptierst du automatisch, dass du eventuell auf der Plattform YouTube zu hören bist
                    \u200b
                `
            },{
                name: "**4. __WERBUNG & HANDEL__**",
                value: `
                    > - Unser Discord Server stellt keine Handels-, Tausch-, Job- oder Werbeplattform dar.
                    > - Werbung für Discord-Server direkt, per Discord Direct Message (DM), durch Invitecodes, URLVerkürzer oder durch Einbindung in jegliche Form von Medien ist verboten
                    > - Jede Form von Dienstleistung (kostenlos oder kostenpflichtig), einschließlich Werbung mit der Verwendung von Nicknames oder Medien, die auf einem der Kanäle hochgeladen werden ist verboten
                    > - Werbung jeglicher oben nicht genannten Art ist ausdrücklich untersagt
                    \u200b
                `
            },{
                name: "**5. __USERNAMEN, NICKNAMEN & AVATARE__**",
                value: `
                    > - Dein Name darf nur alphanumerische Zeichen enthalten. Emojis können in Ihrem Namen verwendet werden, sofern sie mit einigen alphanumerischen Zeichen kombiniert werden
                    > - Avatare müssen altersgerecht sein. Sie dürfen nicht unangemessen sein, sexuell eindeutige Inhalte oder Gore enthalten
                    \u200b
                `
            },{
                name: "**6. __UNANGEMESSENE INHALTE__**",
                value: `
                    > - Das Posten jeglicher unangemessenen Inhalte, einschließlich, aber nicht beschränkt auf explizite, epilepsieauslösende oder pornografische Inhalte und die Verbreitung von Medien dieser Art ist verboten - Dazu gehört auch die Verwendung von sexuell anzüglichen Emojis
                    > - Verbreitung von Anhängen oder Links, die Viren, Malware, raubkopierte Software usw. ist verboten
                    > - Die Verwendung von IP-Trackern oder anderen Trackingsoftware/Tools ist verboten
                    > - Diskussionen oder Konversationen über oben genannte Punkte sind verboten
                    > - Memes sind erlaubt, es sei denn, sie 
                    > (a) provozieren eine religiöse oder politische Debatte,
                    > (b) provozieren andere,
                    > (c) stehen im Zusammenhang mit dem Tod oder
                    > (d) sind für den öffentlichen Konsum unangemessen.
                    \u200b
                `
            },{
                name: "**7. __BEWERBUNGEN, BANS & INGAME EVENTS__**",
                value: `
                    > - Diskussionen über Strafen, Tickets, Beschwerden, Bewerbungen sind verboten
                    > - Moderatoren, die für Events verantwortlich sind reagieren auf öffentliche Nachrichten nicht – nutzt dafür bitte die inGame Funktion bzw. unser Ticket-System
                    \u200b
                `
            },{
                name: "**8. __SONSTIGE REGELUNGEN__**",
                value: `
                    > - Wir speichern jegliche Vorfälle zu Usern. Sollte man zu einem anderen Discord-Konto wechseln, gelten Ihre vorherigen Strafen weiterhin. Strafen verfallen nicht!
                    > - Bei Bedarf können Ausnahmen vom Standard-Strafverfahren gemacht werden
                `
            }
        ])
    ];

    const channel = await client.channels.fetch((content[1] == "dev") ? "828333015892492329" : "835835660282626078")
    
    channel.createWebhook('LPMitKev Regeln', {
        avatar: channel.guild.iconURL({dynamic: true}),
        reason: 'for the Roles'
      }).then(async webhok => {
          await webhok.send(embeds);

          webhok.delete();
      });
}