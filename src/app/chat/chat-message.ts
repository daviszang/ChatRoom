import {Action} from './action';

export interface ChatMessage {
    from?: any;
    content?: any;
    type?: Action;
    group:any;
    channel:any;
}