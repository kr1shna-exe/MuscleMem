import { redis_client } from "../exports/redis_client";

const QUEUE_NAME = "Testing";

async function enqueue(Job: any) {
  try {
    await redis_client.lPush(QUEUE_NAME, Job);
    console.log("Job Added To Queue:", QUEUE_NAME);
  } catch (error) {
    console.log("Failed To Add Job To Queue:", error);
  }
}

async function dequeue(Job: any) {
  try {
    await redis_client.brPop(QUEUE_NAME, Job);
    console.log("Job Popped From Queue:", QUEUE_NAME);
  } catch (error) {
    console.log("Failed To Pop From Queue:", error);
  }
}
