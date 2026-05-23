import { Environment } from '@packages/utilities';
import { connect } from 'mongoose';

main().catch(err => console.log(err));

async function main() {
    await connect(Environment.MONGO_URI);
}