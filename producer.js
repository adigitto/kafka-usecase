const {Kafka} = require("kafkajs")
const msg = process.argv[2];   // Send message as argument

run();
async function run(){
    try
    {
        // Create kafka object so that we can connect to Kafka broker
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["184.72.82.167:9092"]  //Thats the IP of my EC2 server running kafka broker
        })   

        // Create producer 
        const producer = kafka.producer();
        console.log("Connecting ...")
        await producer.connect()
        console.log("Connected!!")

        // Producer sends messages to the topic
        // But first set logic for which partition to send message to
        // Remember if name is btwn A-N = Partition 1 else Partition 2 for M-Z
        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            "topic": "Employees",
            "messages": [
                {
                    "value": msg,
                    "partition" : partition
                }
            ]
        })

        console.log(`Message sent successfully ${JSON.stringify(result)}`)
        await producer.disconnect();
    }
    catch(ex){
        console.error(`Something terrible happened ${ex}`)
    }
    finally{
        process.exit(0);
    }
}