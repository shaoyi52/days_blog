//Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
buf = Buffer.alloc(26);

for(let i=0;i<26;i++){
  buf[i]=i + 97;
}
console.log( buf.toString('ascii'));
console.log( buf.toString('ascii',0,5));
console.log( buf.toString('utf8',0,5));
console.log( buf.toString(undefined,0,5));

