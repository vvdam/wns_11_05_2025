// you can put your types here

export type Country = {
    code: string;
    name: string;
    emoji: string;
    continent?: Continent;
};

export type Continent = {
    code: string;
    name: string;
};
