import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { Axios } from 'axios';

@Module({
    providers: [AxiosAdapter],
    exports:[AxiosAdapter]
})
export class CommonModule {}
