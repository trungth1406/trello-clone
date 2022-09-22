export interface CommonModel {
    id?: number;
    name: string;

}

export interface CardModel extends CommonModel {
    items?: CommonModel[];
}
