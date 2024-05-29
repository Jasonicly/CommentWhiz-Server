const comments = [
    "This product is very soft and cushioned, great quality and easy to wear. I find the price to be acceptable and reasonable",
    "I bought this last week and it just came, it has great quality, fits perfectly and very comfortable. It is extermely soft and feels very nice. Good for money",
    "Easy to wear, fits perfectly, and reasonable price. I really like this. I would highly recommend",
    "Creates warmth and very soft, reasonable price. I would recommend this to my friends. Great product. It allows me to sleep comfortably",
    "I bought this last week and it came very fast, it arrived in 1 day. After reviewing this product, I really like it. It feels very soft and nice and it helps me sleep well. Good for money",
    "This slippers are so comfortable! You're feet melt in the shoe. Glad I purchased them.",
    "they aren't as comfortable as I thought but they are good and economical",
    "These slippers take a conscious effort to walk in as they tend to slip around on the foot. The top material stretches making walking in them an effort. The one plus is they are so feminine and cute looking.",
    "The slippers are comfortable, attractive & fit true to size. The color (pink) wasn't as vibrant as in the ad, but will work.",
    "Love these. Got the navy and they are true to size, comfortable and cute",
    "I got the gray 9/10, and I like the neutral color. These slippers are very soft and comfortable, and the fit is good (although I usually wear size 9, and there isn't much room left, so if you're a 10, these may be tight). The slippers even accommodate my wide feet well. There's a slight ridge along the sides that at first I thought would be uncomfortable, but after a day or two, I don't even notice it. The soles aren't thick, but they provide enough support.",
    "They're a little big but that's OK, I can wear socks with them. They are so comfortable. It's like walking on air.",
    "I have a wide toe box my toes spread, and do not sit on top of one another because I’ve gone barefooted so much my toes and the bones in my feet spread naturally. These shoes are comfortable. I read the reviews and thought I’d take a chance because it’s so difficult to buy shoes without trying them on. There is plenty of room in the toe box and all the way down to the heels. I have wide feet, and these still allow room at the top of my feet and the sides which makes them terribly comfortable and also because they are made of cloth. There’s no rubbing I am very happy. This is how your feet should feel. I have other pairs of house shoes but they’re the furry kind and my feet sweat and they don’t smell very good in those shoes I have to wash them quite often and I’m tired of it. Plus it’s summer and they are way to hot. My feet are not sweating in these shoes. Cheap house shoes with a non slip sole. I’m impressed!",
    "These slippers are very comfortable and true to size sometimes I forget that they’re on my feet until I am outside at the store if you’re interested in something like this, it’s a definite yes for me",
    "Slippers are true to size, very comfy, love the navy and white combo",
    "Nicely made and has good cushion. Sole is rubber and well made. Unfortunately the top strap is very loose, so if you have arthritis or need better support for walking, this is not a good fit because you may trip.",
    "I like the slippers fine they were the right color and fit well and were very soft",
    "Liked the look and feel but should have gotten XL instead of L. But I stretched them they were more comfortable then.",
    "Good slippers, comfortable but need to secure better the lining over the foam. Size and fit is accurate.",
    "This was a re-order. Liked ones I had ordered before and loved them. Really like these as welll.",
    "These are comfortable. Just a little disappointed in the color. It is much lighter than the bright pink that showed in the ad",
    "The color is so pretty. I got the dark blue. They are soft and comfortable. The sole is a bit heavy and thick for walking around the house....but I guess that can be a good thing also if you want to get the paper/take the trash out. Overall I like them very much and I would buy them again. The top doesn't have a lot of support so I would be careful walking long distance or quickly in them. I could see it would be easy to fall. To just walk around the house here and there they work for me. **oddly a week later I have a rash on my feet!! Did anyone else experience this? I don't know if it's the shoe going to see doctor. Will update. Could be an odd coincident......not sure!!!!!!!!!!!!!!!!",
    "I just loved the thickness and softness under my feet. The only negative thing was they were a little wider than I expected on the instep and the more I wore them, they stretched a little! But I still liked them!",
    "There comfortable & soft, my foot slides a lot. I like them.",
    "I loved them but I ordered the wrong size. Gave them to someone with bigger feet than me!",
    "Love these slippers, very comfortable, easy to keep on",
    "The lining on both slippers started to fall apart very first night after they arrived.",
    "Too heavy, feels like actual shoe. Not apartment living friendly",
    "They are slip resistant, nice fit, the memory foam lasted more than 2 weeks which is good, best thing about them you can wear outside, however the memory foam doesn't last longer than 2 weeks"
];

fetch('http://localhost:5000/summarize', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comments: comments})
})
.then(response => response.json())
.then(data => console.log(data));
