import { RalData } from '../../assets/RalData';
import RALColor from '../models/RALColor';

export class ContrastService {
	public getAllColors() {
		return new Promise<RALColor[]>(resolve => {
			resolve(RalData);
		});
	}

	public calculateContrast(RalCode1: number, RalCode2: number) {
		const LRV1Promise = this.getLRvFromRalCode(RalCode1);
		const LRV2Promise = this.getLRvFromRalCode(RalCode2);

		return new Promise<number>(resolve => {
			Promise.all<number>([LRV1Promise, LRV2Promise]).then(values => {
				const contrast =
					(Math.max(values[0], values[1]) - Math.min(values[0], values[1])) / Math.max(values[0], values[1]);
				resolve(contrast);
			});
		});
	}

	private getLRvFromRalCode(RalCode: number) {
		let LRv = 0;
		RalData.map(item => {
			if (item.RAL === RalCode) {
				if (item.LRv) {
					LRv = item.LRv;
				}
			}
		});

		return new Promise<number>((resolve, reject) => {
			if (LRv === 0) {
				reject('RAL colour does not exist');
			}
			resolve(LRv);
		});
	}
}
