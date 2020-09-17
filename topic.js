const {Kafka} = require("kafkajs")

run();
async function run(){
    try
    {
        // Create kafka object so that we can connect to Kafka broker
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["184.72.82.167:9092"]  //Thats the IP of my EC2 server running kafka broker
        })   

        // Create admin to create topics 
        const admin = kafka.admin();
        console.log("Connecting ...")
        await admin.connect()
        console.log("Connected!!")

        // Creating a topic Users
        // with 2 partions - User initials A-M and N-Z 
        await admin.createTopics({
            "topics": [{
                "topic": "Employees",
                "numPartitions": 2
            }]
        })
        console.log("Topic Created successfully")
        await admin.disconnect();
        console.log("Disconnected")
    }
    catch(ex){
        console.error(`Something terrible happened ${ex}`)
    }
    finally{
        process.exit(0);
    }
}