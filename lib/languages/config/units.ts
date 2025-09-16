import { ikalangaUnits } from "@/app/utils/mock/ikalanga-vocabulary";
import { khoekhoegowabUnits } from "@/app/utils/mock/khoekhoegowab-vocabulary";


export const unitsByLanguage: Record<string, typeof ikalangaUnits >={
    ikalanga:ikalangaUnits,
    khoekhoegowab:khoekhoegowabUnits
}
