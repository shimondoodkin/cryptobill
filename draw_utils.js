/*
add after this  console_font_6x8.js (it requieres chunk function )
add above or below this <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.3.1/qrcode.min.js" type="text/javascript"></script>
*/

function chunk (arr, len) {

  var chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}
 
function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}


function draw_text_line(imageData,x,y,text)
{
 var c1,c2,c3,c4,c5,c6,t,r=0,g=0,b=0,n
 for (var c,rows,r,l=0; l < text.length; l++,x+=6) {
    
    c=text.charCodeAt(l);  
    rows=console_font_6x8[c];  
    for(n=0;n<8;n++)
    {
     t=rows[n]>>2; c6=t&1; c5=t&2; c4=t&4; c3=t&8; c2=t&16; c1=t&32;
     if(c1)setPixel(imageData, x  , y+n, r, g, b, 255);
     if(c2)setPixel(imageData, x+1, y+n, r, g, b, 255);
     if(c3)setPixel(imageData, x+2, y+n, r, g, b, 255);
     if(c4)setPixel(imageData, x+3, y+n, r, g, b, 255);
     if(c5)setPixel(imageData, x+4, y+n, r, g, b, 255);
     if(c6)setPixel(imageData, x+5, y+n, r, g, b, 255); 
    }
 }
}
  
function draw_text(imageData,x,y,text)
{
  maxchars=Math.floor(imageData.width/6);
  var lines=[]
  text.replace(new RegExp(".{0,"+maxchars+"}?\n|.{0,"+maxchars+"}",'g'),function(a){if(a.length){if(a[a.length-1]=='\n')a=a.substring(0,a.length-1); lines.push(a); }; return "";})
   console.log(x,y,maxchars);
  for (r=0; r < lines.length; r++,y+=8) {
   draw_text_line(imageData,x,y,lines[r])
   y+=(8*0.5|0);
  }
  return y;
}

function draw_qr(imageData,x,y,qr,dotzize) {
  var rr=0,gg=0,bb=0
  var m=qr.getModuleCount();
  var dotzizem=dotzize-1;
  var xx;
  var  lefttop_pixel,
       leftbottomp_pixel,
       righttopp_pixel,
       rightbottomp_pixel,
       has_left,has_right,has_above,has_below,
       has_above_left,has_below_left,has_above_right,has_below_right;
  
  for (var r = 0; r < m; r += 1) {
    xx=x;
    for (var c = 0; c < m; c += 1) {
      for (var j = 0; j < dotzize; j += 1) { 
        for (var k = 0; k < dotzize; k += 1) { 
          
            /*
            // rounded edjes
            
            lefttop_pixel=(j==0 && k==0)
            leftbottom_pixel=(j==dotzizem && k==0)
            righttop_pixel=(j==0 && k==dotzizem)
            rightbottom_pixel=(j==dotzizem && k==dotzizem)

            has_left=    c>0   && qr.isDark(r, c-1)
            has_right=   c<m-1 && qr.isDark(r, c+1)
            has_above=   r>0   && qr.isDark(r-1, c)
            has_below=   r<m-1 && qr.isDark(r+1, c)
            
            has_above_left=r>0   && c>0 && qr.isDark(r-1, c-1)
            has_below_left=r<m-1 && c>0 && qr.isDark(r+1, c-1)
            
            has_above_right=r>0   && c<m-1 && qr.isDark(r-1, c+1)
            has_below_right=r<m-1 && c<m-1 && qr.isDark(r+1, c+1)


         if( dotzizem>3 &&                            //if this vvv middle condition column is removed, all edjes are rounded. but then it is not interesting.
               ( lefttop_pixel     && ( (!has_left)   && (!has_above_left)   && (!has_above) ) ) 
           ||  ( leftbottom_pixel  && ( (!has_left)   && (!has_above_left)   && (!has_below) ) ) 
           ||  ( righttop_pixel    && ( (!has_right)  && (!has_above_right)  && (!has_above) ) ) 
           ||  ( rightbottom_pixel && ( (!has_right)  && (!has_above_right)  && (!has_below) ) )
  
           )
         {
           
         }
         else*/
         {
           if(qr.isDark(r, c))setPixel(imageData, xx+k  , y+j, rr, gg, bb, 255);                   
         }
        }    
      }
      xx+=dotzize;
    }
    y+=dotzize;
  }
  return y;
};
