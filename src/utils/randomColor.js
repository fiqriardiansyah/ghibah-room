

const colors = ["588da8","ccafaf","e58a8a","d8345f","b590ca","a8d3da","f5cab3","f3ecb8","f8b195","f1935c","745c97","445c3c","badfdb","9cf196","560764","808b97","f46060","f3d179","3c9099","5fbdb0"];

export default function randomColor(){
    const randomNumber = Math.round(Math.random() * 20);
    return colors[randomNumber];
}