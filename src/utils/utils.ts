import { Message } from "../interfaces/Chat";
import {
  Customer,
  CustomerData,
  CustomerProcessedData,
  TransactionProcessedData
} from "../interfaces/CustomerData";

const dateFormat = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

export function getLoadingMessage(): Message {
  return {
    data: {
      content: "",
      id: crypto.randomUUID(),
      isUser: false,
      name: "response",
      time: getTime(),
      type: "ai"
    },
    type: "ai"
  };
}

export function setInitialMessage(): Message[] {
  const angelMessage = "Hi my name is Angel and I'm your retail choice expert. How can I help you today?";
  const messages: Message[] = [{
    data: {
      id: crypto.randomUUID(),
      content: angelMessage,
      name: 'response',
      type: 'ai',
      time: getTime(),
      isUser: false
    },
    type: "ai"
  }];
  return messages;
}

/**
 * Returns the current time formatted as an uppercase string.
 * 
 * This function retrieves the current time, formats it using the `dateFormat` object,
 * and converts the formatted string to uppercase.
 * 
 * @returns The formatted current time as an uppercase string.
 */
export function getTime(): string {
  return dateFormat.format(new Date().getTime()).toLocaleUpperCase();
}

/**
 * Converts a date string from "yyyy-MM-dd HH:mm:ss" format to "MM/dd/yyyy" format.
 * 
 * @param date - The input date string in "yyyy-MM-dd HH:mm:ss" format.
 * @returns The formatted date string in "MM/dd/yyyy" format.
 */
export function formatDate(date: string): string {
  if (!date) {
    return "";
  }

  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return formattedDate;
}

/**
 * Converts the CustomerData to CustomerTableData format.
 * 
 * @param data - CustomerData.
 * @returns The CustomerTableData.
 */
export function processCustomerData(data: CustomerData): CustomerProcessedData[] {
  let result: CustomerProcessedData[] = [];
  data?.customers?.forEach((value: Customer) => {
    let newCustomer: CustomerProcessedData = {
      customerId: value.customer_id,
      customerName: value.customer_name,
      borough: value.customer_borough,
      lastBillDate: formatDate(value.last_bill_date),
      nextBillDate: formatDate(value.next_bill_date),
      serviceType: value.service_type,
      cycleReadDate: formatDate(value.cycle_read_data),
      lastCycleReadDate: formatDate(value.last_cycle_read_data),
      billOption: value.bill_option,
      
      transactions: []
    };

    for (let t of value.transactions) {
      const service = 
        `${t.provider_info?.electrical_service?.toLowerCase() === "y" ? "E" : ""}
        ${
          t.provider_info?.electrical_service?.toLowerCase() === "y" && 
          t.provider_info?.gas_service?.toLowerCase() === "y" ? " / " : ""
        }
        ${t.provider_info?.gas_service?.toLowerCase() === "y" ? "G" : ""}`


      let newTransaction: TransactionProcessedData = {
        id: t.transaction_id,
        receivedDate: formatDate(t.transaction_received_date),
        type: t.transaction_type,
        direction: t.transaction_direction,
        effectiveDate: formatDate(t.effective_date),
        providerId: t.provider_id,
        providerName: t.provider_info?.provider_name,
        providerType: t.provider_info?.provider_type,
        service: service,
        providerStatus: t.provider_info?.provider_status,
        status: t.transaction_status
      };

      if (t?.provider_info?.provider_name && !newCustomer.provider) {
        newCustomer.provider = t.provider_info.provider_name;
      }

      if (t?.billing_info?.bill_status && !newCustomer.billStatus) {
        newCustomer.billStatus = t.billing_info.bill_status;
      }

      newCustomer.transactions?.push(newTransaction);
    }

    result.push(newCustomer);
  });

  return result;
}

// Helpers
// export function formatAgentMessage(response: any): AgentMessage {
//   const time = dateFormat.format(new Date().getTime()).toLocaleUpperCase();
//   return {
//     // content: response.responseContent.response,
//     content: response,
//     time: time,
//     isUser: false,
//     // source: getMetaValue(response.sources, "location"),
//     // title: getMetaValue(response.sources, "title"),
//   };
// }

// export function formatAgentError(response: any): AgentMessage {
//   const time = dateFormat.format(new Date().getTime()).toLocaleUpperCase();
//   return {
//     content: response,
//     time: time,
//     isUser: false,
//     // source: getMetaValue(response.sources, "location"),
//     // title: getMetaValue(response.sources, "title"),
//   };
// }