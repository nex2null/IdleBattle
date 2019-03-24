export default {
    name: 'Enemy: any',
    requiresInput: false,
    getTargets: function(user, characters) {
        return characters.filter(x =>
            x !== user &&
            x.characterType === user.hostileToCharacterType);
    }
}