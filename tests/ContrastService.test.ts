import { ContrastService } from '../src/app/service/ContrastService';

const contrastService: ContrastService = new ContrastService();

test('Test for testing', () => {
	contrastService.calculateContrast(1000, 1001).then(value => {
		expect(parseFloat(value.toPrecision(1))).toEqual(0.08);
	});
});

describe('Contrast calculation', () => {
	it.each([
		[[1000, 1002], 0.12],
		[[1000, 1005], 0.33],
		[[1000, 1006], 0.27],
		[[1000, 1007], 0.27],
		[[1000, 1011], 0.47],
		[[3015, 1020], 0.34],
		[[5011, 8022], 0.2],
		[[9011, 9016], 0.95],
		[[2012, 7008], 0.4],
		[[5005, 6006], 0.3],
		[[8028, 2009], 0.65],
	])('Calculates contrast between %p expecting %p', (colors: number[], result: number) => {
		contrastService.calculateContrast(colors[0], colors[1]).then(value => {
			expect(parseFloat(value.toPrecision(2))).toEqual(result);
		});
	});
});
