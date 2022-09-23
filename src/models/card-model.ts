export interface CommonModel {
    id?: number;
    name: string;

}

export interface CardModel extends CommonModel {
    items?: CommonModel[];
}


export interface TaskRef {
    ref: any;
    data: CommonModel;
}
