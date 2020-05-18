|   | G |  G |  A |  G |  C |  C |  C |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|  1 | 0  | 0  |   |   |   |   |   |
|  2 |   |   |   |   |   |   |   |
| 3  |   |   |   |   |   |   |   |
|  4 |   |   |   |   |   |   |   |
|  5 |   |   |   |   |   |   |   |
|  6 |   |   |   |   |   |   |   |
|  7 |   |   |   |   |   |   |   |

Algorithm doesn't store structures in matrix (that would lead to cubic storage requirement) but regenerates them at the end with backtracking.

CKY is bottom up, and can be presented as dealing with segments in length order, but it can also be presented as left to right, and that is what I do.

For CKY i represents the start of the segment under consideration
For STP i represents the last unpaired (
For `N[i][j]` can either (A) see how it is generated from earlier entries (j-1) or (B) see what it generates in j+1 entries. (keeping maximum scored entry for each position)

CKY N[i][i] and N[i][i-1] set to 0 for each i   
CKY A: N[i][j]<max= N[i][j-1], 1+N[i][k-1]+N[k+1][j-1] over each k in [i,j) such that <k,j> is a pair and    
CKY B: N[i][j]=> N[i][j+1] and N[k][j+1](adding N[k][i-2]+1) for k in [1,j] if <i.j+1> is a pair   

STP N[i][i] set to <(,0> for each i (push)   
STP A: N[i][j]<max= N[i][j-1], N[k][j-1]+N[i][k-1]+1 if <i,j> is a pair  
STP B: N[i][j]=>N[i][j+1] (skip) and N[k][j+1] (pop) (adding N[k][i-1]+1)for k in [1,j] if <i,j+1> is a pair.
