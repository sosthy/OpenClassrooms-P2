import Participation from "./Participation";

interface Olympic {
    id:number;
    country: string;
    participations: Array<Participation>;
}

export default Olympic;