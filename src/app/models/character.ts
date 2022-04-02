export interface characterBio{
    characterName: string,
    classAndLevel: string,
    playerName:string,
    race:string,
    background?:string,
    alignment?:string,
    experience?:number,
    personalityAndTraits?: string,
    ideals?:string,
    bonds?:string,
    flaws?:string,
    backstory?:string,
    alliesAndOrganizations?:string,
    age?:string,
    height?:string,
    weight?:string,
    eyes?:string,
    skin?:string,
    hair?:string
}

export interface bonus{
    description:string,             //Typically the name of the source of the bonus. ie "belt of giant strength"
    value:number,
    id?:string                      //Id is optional value used to associate bonus with items, effects, etc.
}


class ObjectWithBonus{
    public bonuses:bonus[] = [];

    addBonus(bonus:bonus){
        this.bonuses.push(bonus);
    }

    removeBonus(description:string){
        const index = this.bonuses.findIndex(bonus => bonus.description == description);
        if(index != -1){
            delete this.bonuses[index];
        }
    }

    getBonus(){
        let total = 0;
        this.bonuses.forEach(bonus=>{
            total += bonus.value;
        });
        return total;
    }

}


export class Attribute extends ObjectWithBonus{
    public base:number;
    public overwrite:any = null;
    public name: string;

    constructor(name:string, base:number, bonuses:bonus[], overwrite?:number){
        super();
        this.name = name;
        this.base = base;
        this.bonuses = bonuses;
        if(typeof overwrite !== 'undefined'){
            this.overwrite = overwrite;
        }
    }

    setBase(score:number){
        if(score > 20){
            this.base = 20;
            return
        }else if(score < 1){
            this.base = 1;
            return
        }
        this.base = score;
    }

    setOverwrite(overwrite:number){
        this.overwrite = overwrite;
    }

    removeOverwrite(){
        this.overwrite = null;
    }

    getScore(){
        if(this.overwrite != null){
            return this.overwrite;
        }
        return this.base + this.getBonus();
    }

    getModifier(){
        return Math.floor((this.getScore() - 10) / 2);
    }

    setByTotal(total:number){

    }

}


// Skills and saving throws are derived stats
export class DerivedStat extends ObjectWithBonus{
    public overwrite:any = null;
    public proficiencyMultiplier;
    public attribute:Attribute;

    constructor(attribute:Attribute, bonuses:bonus[], proficiencyMultiplier:number, overwrite?:number){
        super();
        this.attribute = attribute;
        this.bonuses = bonuses;
        this.proficiencyMultiplier = proficiencyMultiplier;
        if(typeof overwrite !== 'undefined'){
            this.overwrite = overwrite;
        }
    }

    getScore(proficiency:number){
        if(this.overwrite != null){
            return this.overwrite;
        }
        return proficiency * this.proficiencyMultiplier + this.attribute.getModifier() + this.getBonus();
    }

    getPassive(proficiency:number){
        return 10 + this.getScore(proficiency);
    }

    toSaveObject(){
        return {
            proficiencyMultiplier: this.proficiencyMultiplier,
            bonuses: this.bonuses,
            overwrite: this.overwrite
        }
    }

    toSkillObject(){
        return {
            proficiencyMultiplier: this.proficiencyMultiplier,
            bonuses: this.bonuses,
            overwrite: this.overwrite,
            attribute: this.attribute.name
        }
    }

}

const attributeOrder:string[] = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma"
];

export class Character{
    public attributes:any;
    public skills: any;
    public saves: any;
    public characterBio: characterBio;
    public proficiencyBonus: number;

    private defaultAttributes:any = {
        strength: new Attribute("strength", 10 , []),
        dexterity: new Attribute("dexterity", 10 , []),
        constitution: new Attribute("constitution", 10 , []),
        intelligence: new Attribute("intelligence", 10 , []),
        wisdom: new Attribute("wisdom", 10 , []),
        charisma: new Attribute("charisma", 10 , []),
    };

    private defaultCharacterBio:any = {
        characterName: "",
        playerName: "",
        race: "",
        classAndLevel: "",
        experience:0
    }

    constructor(){
        this.characterBio = Object.assign({}, this.defaultCharacterBio);
        this.attributes = Object.assign({}, this.defaultAttributes);
        this.skills = this.buildDefaultSkills(this.attributes);
        this.saves = this.buildDefaultSaves(this.attributes);
        this.proficiencyBonus = 2;
    }

    private buildDefaultSkills(attributes:any){
        return {
            acrobatics: new DerivedStat(attributes.dexterity, [], 0),
            animal_handling: new DerivedStat(attributes.wisdom, [], 0),
            arcana: new DerivedStat(attributes.intelligence, [], 0),
            athletics: new DerivedStat(attributes.strength, [], 0),
            deception: new DerivedStat(attributes.charisma, [], 0),
            history: new DerivedStat(attributes.intelligence, [], 0),
            insight: new DerivedStat(attributes.wisdom, [], 0),
            intimidation: new DerivedStat(attributes.charisma, [], 0),
            investigation: new DerivedStat(attributes.intelligence, [], 0),
            medicine: new DerivedStat(attributes.wisdom, [], 0),
            nature: new DerivedStat(attributes.intelligence, [], 0),
            perception: new DerivedStat(attributes.wisdom, [], 0),
            performance: new DerivedStat(attributes.charisma, [], 0),
            persuasion: new DerivedStat(attributes.charisma, [], 0),
            religion: new DerivedStat(attributes.intelligence, [], 0),
            sleight_of_hand: new DerivedStat(attributes.dexterity, [], 0),
            stealth: new DerivedStat(attributes.dexterity, [], 0),
            survival: new DerivedStat(attributes.wisdom, [], 0)
        }
    }

    
    private buildDefaultSaves(attributes:any){
        return {
            strength: new DerivedStat(attributes.strength, [], 0),
            dexterity: new DerivedStat(attributes.dexterity, [], 0),
            constitution: new DerivedStat(attributes.constitution, [], 0),
            intelligence: new DerivedStat(attributes.intelligence, [], 0),
            wisdom: new DerivedStat(attributes.wisdom, [], 0),
            charisma: new DerivedStat(attributes.charisma, [], 0)
        }
    }

}