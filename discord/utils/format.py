
def format_skills_text(skillsDict):
        """
        [skillsDict] - A dictionary of skills obtained from classes.py that contains the skills of
        the player's main class

        Beautify indentation in the text to be display in embed message
        """

        # Finds longest length of string to beautify formatting
        longestString = len(list(skillsDict.keys())[0])
        for skill in list(skillsDict.keys())[1:]:
            if len(skill) > longestString:
                longestString = len(skill)
        
        skillsText = "```\t" + " " * longestString + "CHANCE\t" + "DAMAGE\n"
        for skill in skillsDict:
            skillsText += f"{skill.upper()}\t"
            chanceToHit = skillsDict[skill][0]
            damage = skillsDict[skill][1]

            # Adds in extra spaces so that all text are aligned
            if len(skill) != longestString:
                skillsText += " " * (longestString - len(skill))

            skillsText += f"{chanceToHit}%\t  "
            if len(str(chanceToHit)) < 3:
                skillsText += " " * (3 - len(str(chanceToHit)))

            skillsText += f"{damage}%\n"
        skillsText += "```"
        return skillsText

def format_health_text(playersData, monster):
    """
    [playersData] - A dictionary of players' data which contains their statistics
    [monster] - A monster object that contains its relevant statistics

    Beautify indentation in the text to be display in embed message
    """

    # Finds longest length of string to beautify formatting
    longestString = len(monster.name) if monster.HP != 0 else len(monster.name) + 2
    for playerID in playersData:
        playerName = playersData[playerID]["Info"][0]
        if len(playerName) > longestString:
            longestString = len(playerName)

    # healthText = "```\t" + " " * longestString + "HEALTH\n"
    healthText = f"```{monster.name}\t" if monster.HP != 0 else f"```{monster.name} 💀 \t"
    healthText += " " * (longestString - len(monster.name)) + f"{monster.HP}/{monster.maxHP}🖤"
    for playerID in playersData:
        playerName = playersData[playerID]["Info"][0]
        playerHP = playersData[playerID]["Statistics"][4]
        playerMaxHP = playersData[playerID]["Statistics"][5]
        healthText += f"\n{playerName}\t" + " " * (longestString - len(playerName)) + f"{playerHP}/{playerMaxHP}❤️"
    healthText += "```"
    return healthText

def format_battle_text(battleLogs, playersData, monster):
    """
    [playersData] - A dictionary of players' data which contains their statistics
    [battleLogs] - Strings of battle information in player"s turn
    [monster] - A monster object that contains its relevant statistics

    Inserts battleLogs infront of healthText
    """

    battleText = battleLogs + format_health_text(playersData, monster)
    return battleText

def format_grammar(errorList, singular, plural, errorType):
        """
        [errorList] - A list of players' IDs
        [singular] - Singular verb for an object
        [plural] - Plural verb for an object
        [errorType] - Type of error message to be displayed

        Reformats the error message by formatting the verbs in the sentence
        """

        # Returns empty string if list is empty
        errorText = f"<@{errorList[0]}>" if errorList else ""
        for playerID in errorList[1:]:
            errorText += f", <@{playerID}>"

        # Grammar correction
        if errorText:
            if len(errorList) == 1:
                errorText += f" {singular} {errorType}"
            else:
                errorText += f" {plural} {errorType}"
        return errorText