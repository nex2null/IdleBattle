var digitCharacters: any = {
  "0": ['╔','═','╗','║',' ','║','╚','═','╝'],
  "1": ['═','╗',' ',' ','║',' ','═','╩','═' ],
  "2": ['═','═','╗','╔','═','╝','╚','═','═'],
  "3": ['═','═','╗','═','═','╣','═','═','╝'],
  "4": ['╦',' ','╦','╚','═','╣',' ',' ','╩'],
  "5": ['╔','═','═','╚','═','╗','═','═','╝'],
  "6": ['╦',' ',' ','╠','═','╗','╚','═','╝'],
  "7": ['═','═','╗',' ',' ','║',' ',' ','╨'],
  "8": ['╔','═','╗','╠','═','╣','╚','═','╝'],
  "9": ['╔','═','╗','╚','═','╣',' ',' ','╨']
}

export function getAsciiString(damage: number, leftPadding: number) {

  var damageStringArray = damage.toString().split('');

  var paddingString = '';
  for (var i = 0; i < leftPadding; i++) paddingString += ' ';

  var damageString = paddingString;

  damageStringArray.forEach((x: string) => {
    damageString += digitCharacters[x][0] + digitCharacters[x][1] + digitCharacters[x][2] + ' ';
  });

  damageString += '\n' + paddingString;

  damageStringArray.forEach((x: string) => {
    damageString += digitCharacters[x][3] + digitCharacters[x][4] + digitCharacters[x][5] + ' ';
  });

  damageString += '\n' + paddingString;

  damageStringArray.forEach((x: string) => {
    damageString += digitCharacters[x][6] + digitCharacters[x][7] + digitCharacters[x][8] + ' ';
  });

  return damageString;
}