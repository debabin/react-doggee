import React from 'react';

import { IntlText, useIntl, useQuery } from '@features';
import { DateInput, Input, Select } from '@common/fields';
import { Button } from '@common/buttons';
import { validateIsEmpty } from '@utils/helpers';
import { useForm } from '@utils/hooks';
import { requestBreeds } from '@utils/api';

import styles from '../../../../RegistrationPage.module.css';

const registrationFormValidateSchema = {
  dogName: (value: string) => validateIsEmpty(value),
  dogWeight: (value: string) => validateIsEmpty(value)
};

interface PetFormValues {
  dogName: string;
  dogWeight: string;
  breed: Breed;
  dogBirthday: Date;
}

interface PetFromProps {
  pet: Pet;
  isLoading: boolean;
  onChange: (field: keyof PetFormValues, value: PetFormValues[keyof PetFormValues]) => void;
}

export const PetForm: React.FC<PetFromProps> = ({ pet, onChange, isLoading }) => {
  const intl = useIntl();

  const { data: breedsData } = useQuery('breeds', () => requestBreeds({ params: null }), {
    cacheTime: 300000
  });

  const { values, errors, setFieldValue, handleSubmit, resetForm } = useForm<PetFormValues>({
    intialValues: pet,
    validateSchema: registrationFormValidateSchema,
    validateOnChange: false
  });

  React.useEffect(() => {
    resetForm(pet);
  }, [pet.id]);

  const WeightIcon = React.useCallback(() => <div className={styles.weight_postfix}>kg</div>, []);

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <Input
          disabled={isLoading}
          value={pet.dogName}
          label={intl.translateMessage('field.input.dogName.label')}
          // onFocus={() => setFocuseField('')}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const dogName = event.target.value;
            setFieldValue('dogName', dogName);
            onChange('dogName', dogName);
          }}
          {...(!!errors &&
            !!errors.dogName && {
              isError: !!errors.dogName,
              helperText: errors.dogName
            })}
        />
      </div>

      <div className={styles.input_container}>
        <Select
          options={
            breedsData?.map((breed) => ({
              label: breed.name,
              id: breed.id,
              value: breed
            })) ?? []
          }
          onChange={(option) => {
            setFieldValue('breed', option.value);
            onChange('breed', option.value);
          }}
          value={
            values.breed
              ? {
                  label: values.breed.name,
                  id: values.breed.id,
                  value: values.breed
                }
              : null
          }
          components={{
            NoOptionsMessage: () => <IntlText path='field.select.noOption' />
          }}
          label={intl.translateMessage('field.input.breed.label')}
        />
      </div>
      <div className={styles.input_container}>
        <DateInput
          locale={intl.locale}
          disabled={isLoading}
          value={values.dogBirthday}
          label={intl.translateMessage('field.input.dogBirthday.label')}
          // onFocus={() => setFocuseField(null)}
          onChange={(date) => {
            setFieldValue('dogBirthday', date);
            onChange('dogBirthday', date);
          }}
          {...(!!errors &&
            !!errors.dogBirthday && {
              isError: !!errors.dogBirthday,
              helperText: errors.dogBirthday
            })}
        />
      </div>

      <div className={styles.input_container}>
        <Input
          disabled={isLoading}
          value={values.dogWeight}
          label={intl.translateMessage('field.input.dogWeight.label')}
          // onFocus={() => setFocuseField('')}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const dogWeight = event.target.value;
            setFieldValue('dogWeight', dogWeight);
            onChange('dogWeight', dogWeight);
          }}
          components={{ indicator: () => <WeightIcon /> }}
          {...(!!errors &&
            !!errors.dogWeight && {
              isError: !!errors.dogWeight,
              helperText: errors.dogWeight
            })}
        />
      </div>

      <Button type='submit' isLoading={isLoading}>
        <IntlText path='button.next' />
      </Button>
    </form>
  );
};
