import React, { useState } from "react";
import { Text, Flex, Label, Input, SxProp, Button, ThemeUICSSProperties, Box } from "theme-ui";
import { Icon } from '@app/components/Icon';

type RowProps = SxProp & {
  label: string;
  labelId?: string;
  labelFor?: string;
  infoIcon?: React.ReactNode;
};

const UsdEqualizer: React.FC<{ equalizer: any }> = ({ equalizer }) => (
    <Flex sx={{ px: "20px", opacity: 0.5, fontSize: "14px", fontWeight: "300" }}>
      <Text>
        {equalizer()} USD
      </Text>
    </Flex>
);

export const Row: React.FC<RowProps> = ({ sx, label, labelId, labelFor, children, infoIcon }) => {
  return (
    <Flex sx={{ alignItems: "stretch", flexDirection: "column", mb: "10px", ...sx, bg: "transparent" }}>
      <Label
        id={labelId}
        htmlFor={labelFor}
        sx={{
          p: 0,
          position: "relative",
          flex: 1,

          fontSize: 1,
          color: "#8b9496",
          border: 1,
          borderColor: "transparent"
        }}
      >
        <Flex sx={{ alignItems: "center" }}>
          {label}
          {infoIcon && infoIcon}
        </Flex>
      </Label>
      {children}
    </Flex>
  );
};

type PendingAmountProps = {
  value: string;
};

const PendingAmount: React.FC<PendingAmountProps & SxProp> = ({ sx, value }) => (
  <Text {...{ sx }}>
    (
    {value === "++" ? (
      <Icon name="angle-double-up" />
    ) : value === "--" ? (
      <Icon name="angle-double-down" />
    ) : value?.startsWith("+") ? (
      <>
        <Icon name="angle-up" /> {value.substr(1)}
      </>
    ) : value?.startsWith("-") ? (
      <>
        <Icon name="angle-down" /> {value.substr(1)}
      </>
    ) : (
      value
    )}
    )
  </Text>
);

type StaticAmountsProps = {
  inputId: string;
  labelledBy?: string;
  amount: string;
  unit?: string;
  unitPosition?: string;
  unitIcon?: any;
  color?: string;
  pendingAmount?: string;
  pendingColor?: string;
  onClick?: () => void;
};

export const StaticAmounts: React.FC<StaticAmountsProps & SxProp> = ({
  sx,
  inputId,
  labelledBy,
  amount,
  unit,
  unitPosition,
  unitIcon,
  color,
  pendingAmount,
  pendingColor,
  onClick,
  children
}) => {
  return (
    <Flex
      id={inputId}
      aria-labelledby={labelledBy}
      {...{ onClick }}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",

        ...(onClick ? { cursor: "text" } : {}),

        ...staticStyle,
        ...sx
      }}
    >
      <Flex sx={{ alignItems: "center", justifyContent: unitPosition ?? "initial", flex: "100%" }}>
        <Text sx={{ color, fontWeight: "medium" }}>{amount}</Text>
        &nbsp;
        {unit && (
          <Flex sx={{ alignItems: "center", minWidth: unitPosition ? "100px" : "auto" }}>
            {unitIcon ? (
              <>
                {unitIcon} &nbsp;
                <Text sx={{ fontWeight: "light", opacity: 0.8, fontSize: "20px" }}>
                  {unit}
                </Text>
              </>
            ) : (
              <Text sx={{ fontWeight: "light", opacity: 0.8 }}>
                {unit}
              </Text>
            )}
          </Flex>
        )}

        {pendingAmount && (
          <>
            &nbsp;
            <PendingAmount
              sx={{ color: pendingColor, opacity: 0.8, fontSize: "0.666em" }}
              value={pendingAmount}
            />
          </>
        )}
      </Flex>

      {children}
    </Flex>
  );
};

const staticStyle: ThemeUICSSProperties = {
  flexGrow: 1,

  mb: 0,
  pl: 3,
  pr: "11px",
  pb: 0,
  pt: "28px",

  fontSize: 3,

  border: 1,
  borderColor: "transparent"
};

const editableStyle: ThemeUICSSProperties = {
  flexGrow: 1,

  mb: "5px",
  px: "16px",
  py: "6px",

  fontSize: 6,
  border: 5,
  borderColor: "muted",
  borderRadius: "10px",
  color: "#fff",
  mt: "14px"
};

type StaticRowProps = RowProps & StaticAmountsProps;

export const StaticRow: React.FC<StaticRowProps> = ({
  label,
  labelId,
  labelFor,
  infoIcon,
  ...props
}) => (
  <Row {...{ label, labelId, labelFor, infoIcon }}>
    <StaticAmounts {...props} />
  </Row>
);

type DisabledEditableRowProps = Omit<StaticAmountsProps, "labelledBy" | "onClick"> & {
  label: string;
};

export const DisabledEditableRow: React.FC<DisabledEditableRowProps> = ({
  inputId,
  label,
  unit,
  unitPosition,
  unitIcon,
  amount,
  color,
  pendingAmount,
  pendingColor
}) => (
  <Row labelId={`${inputId}-label`} {...{ label, unit }}>
    <StaticAmounts
      sx={{ ...editableStyle, boxShadow: 0, p: 0 }}
      labelledBy={`${inputId}-label`}
      {...{ inputId, amount, unit, unitPosition, unitIcon, color, pendingAmount, pendingColor }}
    />
  </Row>
);

type EditableRowProps = DisabledEditableRowProps & {
  editingState: [string | undefined, (editing: string | undefined) => void];
  editedAmount: string;
  setEditedAmount: (editedAmount: string) => void;
  maxAmount?: string;
  maxedOut?: boolean;
  equalizer?: any;
};

export const EditableRow: React.FC<EditableRowProps> = ({
  label,
  inputId,
  unit,
  unitPosition,
  unitIcon,
  amount,
  color,
  pendingAmount,
  pendingColor,
  editingState,
  editedAmount,
  setEditedAmount,
  maxAmount,
  maxedOut,
  equalizer
}) => {
  const [editing, setEditing] = editingState;
  const [invalid, setInvalid] = useState(false);

  return editing === inputId ? (
    <Row {...{ label, labelFor: inputId, unit, unitIcon }} sx={{ mb: "20px" }}>

      <Input
        autoFocus
        id={inputId}
        type="number"
        step="any"
        defaultValue={editedAmount}
        //@TODO: fix after!!! Warning: Received `false` for a non-boolean attribute `invalid`.
        /* {...{ invalid }} */
        onChange={e => {
          try {
            setEditedAmount(e.target.value);
            setInvalid(false);
          } catch {
            setInvalid(true);
          }
        }}
        onBlur={() => {
          setEditing(undefined);
          setInvalid(false);
        }}
        variant="editor"
        sx={{
          ...editableStyle,
          fontWeight: "medium",
          bg: invalid ? "invalid" : "#1d3338",
        }}
      />

      {equalizer && <UsdEqualizer equalizer={equalizer} />}

    </Row>
  ) : (
    <Row labelId={`${inputId}-label`} {...{ label, unit }} sx={{ mb: "20px" }}>
      <StaticAmounts
        sx={{
          ...editableStyle,
          bg: invalid ? "invalid" : "#1d3338"
        }}
        labelledBy={`${inputId}-label`}
        onClick={() => setEditing(inputId)}
        {...{ inputId, amount, unit, unitPosition, unitIcon, color, pendingAmount, pendingColor, invalid }}
      >
        {maxAmount && (
          <Button
            sx={{ fontSize: 1, p: 1, px: 3 }}
            onClick={event => {
              setEditedAmount(maxAmount);
              event.stopPropagation();
            }}
            disabled={maxedOut}
          >
            max
          </Button>
        )}
      </StaticAmounts>

      {equalizer && <UsdEqualizer equalizer={equalizer} />}

    </Row>
  );
};


export const StaticParamsRow: React.FC<StaticRowProps> = ({
  label,
  labelId,
  labelFor,
  infoIcon,
  ...props
}) => (
  <Row {...{ label, labelId, labelFor, infoIcon }} sx={{ flexDirection: "row", justifyContent: "space-between", mb: "14px", flex: 1 }}>
    <StaticAmounts {...props} sx={{ p: 0, fontSize: 1, flex: 1 }} />
  </Row>
);