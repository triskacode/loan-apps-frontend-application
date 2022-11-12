import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { CreatePaymentIntensDto } from "../dto/create-payment-intens.dto";
import { AccountRepository } from "../repositories/account.repository";

export const useCreatePayment = () => {
  const { httpExceptionsHandler } = useExceptionsHandler();

  const { mutate: doCreatePayment, ...requestState } = useMutation({
    mutationFn: (dto: CreatePaymentIntensDto) =>
      AccountRepository.createPaymentIntens(dto),
    onError: httpExceptionsHandler,
  });

  return { doCreatePayment, requestState };
};
