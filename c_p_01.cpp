#include <stdio.h>
int main(void){
	int k,n,num=0;
	scanf("%d %d",&k,&n);
	while(1){
		if(k>=n){
			k -= n;
			++num;
			++k;
		} else break;
	}
	printf("%d",num);
	
	
	
	return 0;
}
