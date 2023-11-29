import Teams from "@enums/Teams.enum";

export default function buildDraft(){
    const pickOrder = [];
  
    for (let i = 0; i < 14; i++) {
      pickOrder.push(i % 2 === 0 ? Teams.Player : Teams.Computer);
    }
  
    return pickOrder

}
