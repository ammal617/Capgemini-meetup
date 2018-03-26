/*
 Skriv ut alla siffror 1-100
 */
public class Loops1 {

	public static void main(String[] args) {
		
		int[] array = new int[6];
		array[0]= 0;
		array[1] = 3;
		array[2]= 1;
		array[3]= 2;
		array[4]= 5;
		
		for (int x = 0; x< array.length; x++) {
			System.out.println(array[x]+ " is located at index " + (x));
						
		}
		
		/*for (int x: array) {
			System.out.println(x);
		}*/
	}
}
