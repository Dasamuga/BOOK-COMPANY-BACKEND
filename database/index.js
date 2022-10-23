let books=[
    {
        ISBN:"1234ONE",
        title:"getting start mern",
        authers:[1,2],
        language:"en",
        pubDate:"2012-09-21",
        noOfPage: 223,
        category:["fiction","programmnig","tech","web dev"],
        publication:1
    },

    {
        ISBN:"1234TWO",
        title:"getting start with py",
        authers:[1,2],
        language:"en",
        pubDate:"2021-07-28",
        noOfPage: 301,
        category:["arrays","datamodel","fum","Al"],
        publication:1
    }
];


    let authers =[

        {
            id:1,
            name:"Thanushan",
            books:["1234ONE","1234TWO"]

        },
        {
            id:2,
            name:"Ram",
            books:["1234ONE"]

        }
    ];

    let Publications=[
        {
            id:1,
            name:"Thanu Publications",
            books:["1234ONE"]
        },

        {
            id:2,
            name:"Sanjee Publications",
            books:[]
        }
        
    ];

module.exports={books,authers,Publications};
    
