/*L0,S,GGAGCCC
GGCGGUCCUCAGUAAGGAGUACGGC
Kravchenko
MAVLSKEYGFVLLTGAASFIMVAHLAINVSKARKKY
//AUGGCGGUCCUCAGUAAGGAGUACGGCUUCGUACUCCUUACUGGGGCCGCCAGCUUCAUCAUGGUGGCGCACCUGGCCAUCAAUGUGAGCAAGGCUCGCAAGAAGUACUAA
//.(((((((((.((((((((((((((....)))))))))))))))))))))))(((((....(((((((.......))))))).(((((((...))))))).)))))..... 
*/
"use strict";
export {};
//GGCCGAAAAUCGAAGGGAAAAAAAACCGCC


function exit1(message:string){
  alert(message);
  throw(message);
}

class pkdstate{
  //j:number;//latest position
  //i:number;//posn of last unmatched (
  y:string;//best structure on i..j
  score:number;
  k:number;
}

function paddP(a:pkdstate,b:pkdstate,score:number,k:number):pkdstate{
  return {y:b.y+a.y+')',score:a.score+b.score+score,k:k};

}

function padd1(a:pkdstate,b:pkdstate,score:number,k:number):pkdstate{
  return {y:'('+a.y+')'+b.y,score:a.score+b.score+score,k:k};}

function padd2(a:pkdstate,b:pkdstate,score:number,k:number):pkdstate{
  return {y:a.y+'('+b.y+')',score:a.score+b.score+score,k:k};}

function padd3(a:pkdstate,b:pkdstate,score:number,k:number):pkdstate{
  return {y:a.y+b.y+')',score:a.score+b.score+score,k:k};}
  
function push(j:number){
  N[j+1][j+1]={y:'(',score:0,k:0}
}

function updateifBetter(i:number,j:number,cand:pkdstate){
  if (cand.score>N[i][j].score) N[i][j]=cand;
}

function skip(i:number,j:number){
  let cur:pkdstate=N[i][j];
  N[i][j+1]={y:cur.y+'.',score:cur.score-0.1,k:0};
}

function pop(i:number,j:number,score:number){
  for (let k=0;k<i;k++){
   let cand:pkdstate=paddP(N[i][j],N[k][i-1],pscore1(i,j+1),i);
   if (cand.score>N[k][j+1].score) N[k][j+1]=cand;
  }}
   let N:pkdstate[][];

var alpha=new RegExp("^[a-zA-Z]+$");
var pairs: string[];
var scores: number[];
var minloop: number;
var dotsco: number;
var sequence: string | any[];//='_GGCCGAAAAUCGAAGGGAAAAAAAACCGCC';
var len: number;//=sequence.length-1;
var structure: any[];//=Array(len).fill('.');
var L=2;
function pscore1(i:number,j: number){
  var p=pairs.indexOf(sequence[i]+sequence[j]);
  if (p>=0)return scores[p];
  else return 0;
  //return pairs.indexOf(sequence[i]+sequence[j])>0;
}

function N2table(table:HTMLTableElement){
  table.innerHTML = "";
  for (let i in N) {
    let row=N[i];
    table.insertRow();
    let trow=table.rows[table.rows.length - 1];
    trow.insertCell().outerHTML='<th>'+i.toString()+'</th>';
    for (let cell of row) {
      trow.insertCell().innerHTML = cell?cell.score.toFixed(1)+','+cell.k+'<br>'+cell.y:'';
    }
  }
}

function fold(sequin: string,proc:number){
let d: number,i: number,j: number,k: number,t: number,curm:number,val:number;
//set following here so they are reset during rerun
minloop=3;
pairs=['**','GC','CG','AU','UA','GU','UG'];
scores=[0,3,3,2,2,1,1];
dotsco=-0.1;
var args=sequin.split(',');
var afirst=args[0].toUpperCase();
let l1:string=afirst.charAt(0);
while (args.length>1){//alpha.test(l1)
	let astr:string=args.shift().slice(1);
  switch (l1){
    case "L":if (astr!='')minloop=parseInt(astr);break;
    case "N":pairs=['**','GC','CG','AU','UA'];break;
    case "S":scores=[0,1,1,1,1,1,1];break;
  }
  //l0,N,S,GCACGACG
	afirst=args[0].toUpperCase();
	l1=afirst.charAt(0);
}
sequence='_'+afirst;
len=sequence.length-1;
N=new Array();
for (i=0;i<=len+1;i++)N[i]=new Array(); //allow N[i+1][i]
structure=Array(len).fill('.');
structure[0]='#';
/*var aseq=sequence.split("");
N=new Array();
for (i=1;i<=len;i++){
  N[i]=new Array();*/

structure=Array(len).fill('.');
structure[0]='#';
//var aseq=sequence.split("");
// 1 ~ up from diagonal 2 ~ left to right 3 L2R and  segments start with (
// B~ Backward search F~ Forward propagation
let bb=proc<=4;
for (i=1;i<=len+1;i++){
  if (!bb) N[0][i-1]={score:0,y:'.'.repeat(i-1),k:0}
  for (t=-1;t<=len-i;t++){
//    N[i][i+t]={score:0,y:t<0?'':'.'.repeat(t)};
if (bb)N[i][i+t]={score:0,y:'.'.repeat(t+1),k:0};
else if (t>=0)N[i][i+t]={score:0,y:'('+'.'.repeat(t),k:0};
}}
switch (proc){
  case 1:process1B();traceback1(1,len);break;
  case 2:exit1('not implemented');break;
  case 3:process2B();traceback2(1,len);break;
  case 4:process2F();traceback2(1,len);break;
  case 5:process3B();traceback3(0,len);break;
  case 6:process3F();traceback3(0,len);break;
}
if (proc<=4)return N[1][len];
else return N[0][len];
}

function addot(s:pkdstate):pkdstate{
return {y:s.y+'.',k:0,score:s.score+dotsco};
}
function process1B(){
  var i:number,j:number,k:number,d:number,val:number,t:number;
  var curm:pkdstate;
  for (d = minloop + 1; d <= len - 1; d++) {
    for (i = 1; i <= len - d; i++) {
        j = i + d;
      curm={...N[i+1][j]};
      curm={y:'.'+curm.y,score:curm.score+dotsco,k:0};
      for (k=i+minloop+1;k<=j;k++){
        var score=pscore1(i,k);
        if (score>0){
          val=score+N[i+1][k-1].score+N[k+1][j].score;
          if (val>curm.score)
            curm={score:val,k:k,y:'('+N[i+1][k-1].y+')'+N[k+1][j].y};
        }}
        N[i][j]=curm;
    }
  }
}

function process2B(){
  var i:number,j:number,k:number,d:number,val:number;
  let curm:pkdstate;
  for (j=1;j<=len;j++){
    for (i=1;i<j-minloop;i++){
      curm=addot(N[i][j-1]);
      for (k=i;k<j-minloop;k++){
        var score=pscore1(k,j);
        if (score>0){
          val=score+N[i][k-1].score+N[k+1][j-1].score;
          if (val>curm.score)
            curm={score:val,k:k,y:N[i][k-1].y+'('+N[k+1][j-1].y+')'};;
        }}
        N[i][j]=curm;
    }
  }
}

function process2F()
{
  var i:number,j:number,k:number,d:number,val:number;
  let cand:pkdstate;
  for (j=1;j<len;j++){
    for (i=1;i<=j+1-minloop;i++){
      cand=N[i][j];
      updateifBetter(i,j+1,{y:cand.y+'.',score:cand.score-0.1,k:0})
      let score=pscore1(i-1,j+1);
      if (score>0)
      for (k=1;k<i;k++){
          updateifBetter(k,j+1,padd2(N[k][i-2],N[i][j],score,i))
        }}
    }
  }

function process3F(){
  var j: number,i: number;
  for (j=0;j<len;j++){
    for (i=0;i<=j;i++){
      let cur:pkdstate=N[i][j];
      N[i][j+1]=addot(cur);
      var score=pscore1(i,j+1);
      if (i>0&&i<=j-minloop&&score>0)
      for (let k=0;k<i;k++){
        updateifBetter(k,j+1,padd3(N[k][i-1],N[i][j],score,i));
       }}}
}

function process3B(){
  var j: number,i: number,k: number,score: number,val:number;
  var curm:pkdstate;
  for (j=1;j<=len;j++){
    for (i=0;i<j-minloop;i++){
      curm=addot(N[i][j-1]);
      for (k=i+1;k<j-minloop;k++){
        score=pscore1(k,j);
        if (score>0){
          val=score+N[i][k-1].score+N[k][j-1].score;
          if (val>curm.score)
            curm=padd3(N[i][k-1],N[k][j-1],score,k);
        }
      }
      N[i][j]=curm;}}
}

function traceback1(i: number,j: number){
  while (N[i][j].k==0){
    if (j<=i)return;
    i++;
  }
  let k:number=N[i][j].k;
  console.log("("+i+","+k+")");
  structure[i]='(';
  structure[k]=')';
  traceback1(i,k-1);traceback1(k+1,j)

}

function traceback2(i: number,j: number){
  while (N[i][j].k==0){
    if (j<=i)return;
    j--;
  }
  let k:number=N[i][j].k;
  console.log("("+k+","+j+")");
  structure[k]='(';
  structure[j]=')';
  traceback2(i,k-1);traceback2(k+1,j-1)

}

function traceback3(i: number,j: number){
  while (N[i][j].k==0){
    if (j<=i)return;
    j--;
  }
  let k:number=N[i][j].k;
  console.log("("+k+","+j+")");
  structure[k]='(';
  structure[j]=')';
  traceback3(i,k-1);traceback3(k,j-1)

}

function traceback(i: number , j: number){
  var k:number,score:number,Nij:number,newval:number;
  newval=N[i][j].score;
  do{
    if (j<=i) return;
    Nij=newval;
    newval=N[i][--j].score;
} while (Nij==newval) ;
j++;
for (k = i;k < j-minloop ;k++){
  score=pscore1(k,j);
 if (score>0 && Nij == N[i][ k-1].score + N[k+1][ j-1].score + score){

  traceback(i+1, k - 1); traceback(k + 1, j);return;}
}}
